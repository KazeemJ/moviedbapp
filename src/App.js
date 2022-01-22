import './App.css';
import React, {useState, useEffect} from 'react'
import Search  from './components/Search';
import axios from 'axios';
import Results from './components/Results';
import Popup from './components/Popup';

function App() {
  const [state, setState] = useState({
    s: "", // the search 
    results: [],
    selected: {},
    page: 1
  });
  const apiurl = "http://localhost:8085/api";

  useEffect(() => axios.get(apiurl + "/movie/popular?page=" + state.page).then(({ data }) => {
    let results = data.results;

    setState(prevState => {
      return {...prevState, results: results}
    })
  }),[])


  const search = (e) => {
    if(e.key === "Enter"){
      if(state.s != undefined && state.s.trim() != ""){
        axios.get(apiurl + "/search/movie?page=" + state.page + "&search=" + state.s).then(({ data }) => {
          let results = data.results;
  
          setState(prevState => {
            return {...prevState, results: results}
          })
        })

      } else {
        axios.get(apiurl + "/movie/popular?page=" + state.page).then(({ data }) => {
          let results = data.results;
      
          setState(prevState => {
            return {...prevState, results: results}
          })
        })
      }
      
    }
  }

  const handleInput = (e) => {
    let s = e.target.value; 

    setState(prevState =>{
      return {...prevState, s: s}
    });
    
    console.log(state.s);

  }

  const openPopup = id => {
    axios(apiurl + "/movie/" + id).then(({ data }) => {
      let result = data;
      console.log(apiurl + "&i=" + id);
      console.log(result);

      setState(prevState => {
        return { ...prevState, selected: result }
      });
    });
  }

  const closePopup = () => {
    setState(prevState => {
      return { ...prevState, selected: {} }
    });
  }

  return (
    <div className="App">
      <header>
        <h1>Movie Database</h1>
      </header>
      <main>
        <Search handleInput={handleInput} search={search} />

        <Results results={state.results} openPopup={openPopup} />

        {(typeof state.selected.original_title != "undefined") ? <Popup selected={state.selected} closePopup={closePopup} /> : false}
      </main>
    </div>
  );
}

export default App
