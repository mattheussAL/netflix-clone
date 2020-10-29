import React, { useState} from 'react';

import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';


import './style.css';

export default function Movie({title, items}) {
  const [scrollX, setScrollX] = useState(-400)

  function handleLeftArrow() {
    let x = scrollX + Math.round(window.innerWidth / 2);

    if ( x > 0 ) {
      x = 0;
    }

    setScrollX(x)
  }

  function handleRightArrow() {
    let x = scrollX - Math.round(window.innerWidth / 2);
    let list = items.results.length * 150;

    if((window.innerWidth - list) > x) {
      x = (window.innerWidth - list) - 60
    }

    setScrollX(x)
  }

  return (
    <div className="movie">
      <h2>{title}</h2>

      <div className="movie-left arrow" onClick={handleLeftArrow}>
        <NavigateBeforeIcon style={{fontSize: 50}} />
      </div>
      <div className="movie-right arrow" onClick={handleRightArrow}>
        <NavigateNextIcon style={{fontSize: 50}} />
      </div>

      <div className="movie-listarea" >
        <div className="movie-list" style={{
          marginLeft: scrollX,
          width: (items.results.length * 150),
        }}>
          {items.results.length > 0 && (items.results.map((item, key) => (
            <div key={key} className="movie-item">
              <img src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} alt={item.original_title}/>
            </div>
          )))}
        </div>
      </div>
    </div>
  )
}

