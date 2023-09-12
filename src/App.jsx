import React, {useEffect, useState} from 'react';
import './App.css';
import AnimeCardList from './component/animecard/AnimeCard.jsx';
import LoadingCircle from './component/simples/LoadingCircle.jsx';
import GetAnimes from './module/GetAnimes.js';



const App = () => {
  const [animes, setAnimes] = useState([]);
  const [title, setTitle] = useState('One Piece');
  const [buscaConfig, setBuscaConfig] = useState(
    {title: title, callback: setAnimes, site: 'kitsu'}
  );
  useEffect(() => {
    GetAnimes(buscaConfig).run();
  }, []);

  function handlerChange(e) {
    e.preventDefault();
    setTitle(e.target.value);
  }

  function onSubmitoso(e) {
    e.preventDefault();
    setAnimes([]);
    buscaConfig.title = title;
    setBuscaConfig(buscaConfig);
    GetAnimes(buscaConfig).run();
  }


  return (
    <div className="min-h-screen grid place-items-center font-mono bg-gray-900">
      <form onSubmit={onSubmitoso}>
        <input type="text" value={title} onChange={handlerChange}/>
        <button type="button"
          className="botao"
          onClick={onSubmitoso}>Go</button>
      </form>
      <div>
        {animes !== null && animes.length > 0 ? (
          <AnimeCardList animes={animes}/>
        ) : (
          <LoadingCircle/>
        )}
      </div>
    </div>
  );
};

export default App;
