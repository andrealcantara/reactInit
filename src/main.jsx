import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Outlet, Route, Routes} from 'react-router-dom';
import BuscaAnimes from './component/buscaAnimes/BuscaAnimes.jsx';
import './assets/css/main.css';
import NaoEncontrado from './component/simples/NaoEncontrado.jsx';
import TesteGerado from './component/GeradorCPT/Main.jsx';


const LayoutPrincipal = () => (
  <div className="min-h-screen grid place-items-center font-mono bg-gray-900">
    <Outlet/>
  </div>
);

export default function Main() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LayoutPrincipal/>}>
          {/*<Route element={<BuscaAnimes/>}/>*/}
          <Route path="animes" element={<BuscaAnimes />}/>
          <Route index path="teste" element={<TesteGerado />}/>
          <Route index element={<TesteGerado />}/>
          <Route path="*" element={<NaoEncontrado />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Main/>
  </React.StrictMode>
);
