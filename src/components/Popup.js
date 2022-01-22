import React from 'react';

function Popup({ selected, closePopup}) {
  return (
      <section className='popup'>
          <div className='content'>
              <h2>{selected.original_title} <span>({selected.release_date})</span></h2>
              <p className='rating'>Rating: {selected.vote_average}</p>
              <div className='plot'>
                  <img src={`https://image.tmdb.org/t/p/original${selected.poster_path}`} />
                  <p>{selected.overview}</p>
              </div>
              <button className='close' onClick={closePopup}>Close</button>
          </div>

      </section>
  )
}

export default Popup;
