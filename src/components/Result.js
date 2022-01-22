import React from 'react';

function Result({ result, openPopup }) {
  return (
  <div className='result' onClick={() => openPopup(result.id)}>
      <img src={`https://image.tmdb.org/t/p/original${result.poster_path}`} />
      <h3>{result.original_title}</h3>
  </div>
  )
}

export default Result;
