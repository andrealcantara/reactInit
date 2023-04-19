import React from 'react';
import './AnimeCard.css';
import {listTruncade, truncated} from '../../Utils.js';


const AnimeCard = ({ anime }) => {
  return (
    <div className="anime bg-white rounded-md bg-gray-800 shadow-lg">
      <div className="md:flex px-4 leading-none max-w-4xl">
        <div className="flex-none ">
          <img
            src={anime.poster}
            alt="pic"
            className="h-72 w-56 rounded-md shadow-2xl transform -translate-y-4 border-4 border-gray-300 shadow-lg"
          />
          <span className="text-sm ">[{anime.id}]</span>
        </div>
        <div className="flex-col text-gray-600">
          <p className="pt-4 text-2xl font-bold">
            {anime.titulo} ({anime.format.temporada})(
            {anime.tipoMedia.toUpperCase()})
          </p>
          <p className="pt-4 text-sm font-bold">
            {anime.titulosAlternativos?.original ?
              anime.titulosAlternativos.original : anime.titulosAlternativos.principal}
          </p>
          <hr className="hr-text" data-content="" />
          <div className="text-md flex justify-between px-4 my-2">
            <span className="font-bold">
              {anime.format.tempo} | {listTruncade(anime.generos)}
            </span>
            <span className="font-bold"></span>
          </div>
          <p className="hidden md:block px-4 my-4 text-sm text-justify">
            {truncated(anime.sinopse)}
          </p>

          <p className="flex text-md px-4 my-2">
            Rating: {anime.notaMedia}
            {anime.studios?.length > 0 ? (
              <>
                <span className="font-bold px-2">|</span>
                Studio: {listTruncade(anime.studios, 40)}
              </>
            ) : ''}
          </p>
          <div className="text-xs">
            <button
              type="button"
              className="border border-gray-400 text-gray-400 rounded-md
              px-4 py-2 m-2 transition duration-500 ease select-none
              hover:bg-gray-900 focus:outline-none focus:shadow-outline">Clique</button>
          </div>
        </div>
      </div>
    </div>
  );
};


const AnimeCardList = ({ animes }) => {
  const list = animes.map((anime) => (
    <AnimeCard anime={anime} key={anime.id}/>
  ));


  return (
    <>
      {list}
    </>
  );
};

export default AnimeCardList;
