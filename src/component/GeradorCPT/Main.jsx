import React from 'react';
// import CaixaCell from './fragments/CaixaCell.jsx';
import CaixaCompletaCell from './fragments/CaixaCompletaCell.jsx';
import Linha from './fragments/Linha.jsx';
import LinhaEmBranco from './fragments/LinhaEmBranco.jsx';
import TituloPostCell from './fragments/TituloPostCell.jsx';
// import TituloPostCell from './fragments/TituloPostCell.jsx';
import TitulosCell from './fragments/TitulosCell.jsx';
// import Linha from './fragments/Linha.jsx';
// import TituloPostCell from './fragments/TituloPostCell.jsx';
import GeradorCPT from './GeradorCpt.jsx';

const App = () => (
  <>
    <h1 className="text-white">Construindo</h1>
    <div id="bodyPost" className="w-full max-w-6xl bg-red-600 p-2 m-1 rounded rounded-bl-none rounded-tr-none">
      <GeradorCPT>
        <CaixaCompletaCell>
          <GeradorCPT>
            <Linha>
              <TituloPostCell titulo="One Piece" subtitulo="Um pirata Mucho Loco" />
            </Linha>
            <LinhaEmBranco />
            <Linha>
              <TitulosCell titulos={['alfA','betA']} />
            </Linha>
          </GeradorCPT>
        </CaixaCompletaCell>
      </GeradorCPT>

    </div>
  </>
);

export default App;

