import React, {useEffect, useState} from 'react';
import AnimeCardList from './component/animecard/AnimeCard.jsx';
import LoadingCircle from './component/simples/LoadingCircle.jsx';
import GetAnimes from './module/GetAnimes.js';




const App = () => {
  const [animes, setAnimes] = useState([]);
  useEffect(()=> {
    GetAnimes({title:1, limit:10, callback:setAnimes, site:'kitsu'}).run();
  },[]);


  return (

    <div className="min-h-screen grid place-items-center font-mono bg-gray-900">
      {animes !== null && animes.length > 0 ? (
        <AnimeCardList animes={animes} />
      ) : (
        <LoadingCircle />
      )}
    </div>
  );
};

export default App;
