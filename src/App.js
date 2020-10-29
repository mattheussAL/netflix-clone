import React, { useEffect, useState } from 'react';

import Movie from './components/Filmes';
import Destaque from './components/Destaque';
import Header from './components/Header';
import api from './api';

import './styles/Globalstyles.css';

export default function App() {
  const [movieList, setMovieList ] = useState([]);
  const [destaqueData, setDestaqueData ] = useState(null);
  const [black, setBlack] = useState(false)

  useEffect(() => {
    const loadAll = async () => {
      let list = await api.getHomeList();
      setMovieList(list);

      let originals = list.filter(item => item.slug === 'originals');
      let randomOriginals = Math.floor(Math.random() * (originals[0].items.results.length - 1));
      let chosen = originals[0].items.results[randomOriginals];
      let chosenInfo = await api.getMovieInfo(chosen.id, 'tv');

      setDestaqueData(chosenInfo);
    }

    loadAll()
  }, [])

  useEffect(() => {
    const scrollListener = () => {
      if(window.scrollY > 10)  {
        setBlack(true)
      } else {
        setBlack(false)
      }
    } 

    window.addEventListener('scroll', scrollListener);

    return () => {
      window.removeEventListener('scroll', scrollListener)
    }
  }, [])

  return (
    <>
      <Header black={black} />

      <div className="page">
        {destaqueData && ( <Destaque item={destaqueData} /> )}

        <section className="lists">
          {movieList.map((item, key) => (
            <div>
              <Movie key ={key} title={item.title} items={item.items} />
            </div>
          ))}
        </section>

        {/* <footer>
          <a 
            className="github"
            target="_blank"
            href="https://github.com/mattheussAL">
            <span>
              <GitHubIcon style={{fontSize: 37}}/>
            </span>
          </a>
          <a 
            className="linkedin" 
            target="_blank" 
            href="https://www.linkedin.com/in/matheus-alves-dos-santos-b5038a184/">
            <span>
              <LinkedInIcon style={{fontSize: 40}}/>
            </span>
          </a>

          <p>Projeto <span>Netflix</span> | ReactJS</p>
        </footer> */}

        {movieList.length <= 0 && (
          <div className="loading">
            <img src="https://www.filmelier.com/pt/br/news/wp-content/uploads/2020/03/netflix-loading.gif" alt="loading"/>
          </div>
        )}

      </div>
    </>
  );
}