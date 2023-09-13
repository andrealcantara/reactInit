import React, {useState} from 'react';
// import React, {useEffect, useState} from 'react';
import './BuscaAnimes.css';
import AnimeCardList from '../animecard/AnimeCard.jsx';
import LoadingCircle from '../simples/LoadingCircle.jsx';
import GetAnimes from '../../module/GetAnimes.jsx';


const BuscaAnimes = () => {
  const buscarNo = site => 'Buscar no ' + site;
  const [animes, setAnimes] = useState([]);
  const [title, setTitle] = useState('');
  const [buscaConfig, setBuscaConfig] = useState(
    {title: title, callback: setAnimes, site: 'kitsu', typeMedia: ['tv', 'movie']});

  const [placehold, setPlacehold] = useState(buscarNo(buscaConfig.site.toUpperCase()));
  // useEffect(() => {
  //   GetAnimes(buscaConfig).run();
  // }, [buscaConfig, title]);

  function handlerChange(e) {
    e.preventDefault();
    setTitle(e.target.value);
  }

  function onSubmitoso(e) {
    e.preventDefault();
    setAnimes([]);
    buscaConfig.title = title;
    setBuscaConfig(buscaConfig);
    setPlacehold(buscarNo(buscaConfig.site.toUpperCase()));
    GetAnimes(buscaConfig).run();
  }


  return (
    <>
      <form onSubmit={onSubmitoso} className="w-full max-w-xl flex flex-col py-5 px-8">
        <div className="flex items-center p-6 space-x-6">
          <div className="flex bg-gray-100 p-4 w-full space-x-4 rounded-lg justify-between">
            <input className="w-full bg-gray-100 outline-none text-gray-700" type="text"
              placeholder={placehold} value={title}
              onSubmit={onSubmitoso} onChange={handlerChange}/>
            <div className="border border-gray-900 bg-transparent py-3 px-5 text-black font-semibold
            rounded-lg hover:shadow-lg hover:border-white hover:bg-gray-900 hover:text-white transition
            duration-500 cursor-pointer" onClick={onSubmitoso}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 opacity-30" fill="none" viewBox="0 0 24 24"
                stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            </div>
          </div>
        </div>
      </form>
      <div>
        {animes !== null && animes.length > 0 ? (
          <AnimeCardList animes={animes}/>
        ) : (
          title.length > 0 ? (
            <LoadingCircle />
          ):(
            <div></div>
          ))}
      </div>
    </>
  );
};

export default BuscaAnimes;
