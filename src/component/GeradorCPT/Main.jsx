import React from 'react';
import Linha from './fragments/Linha.jsx';
// import TituloPostCell from './fragments/TituloPostCell.jsx';
import TitulosCell from './fragments/TitulosCell.jsx';
// import Linha from './fragments/Linha.jsx';
// import TituloPostCell from './fragments/TituloPostCell.jsx';
import GeradorCPT from './GeradorCpt.jsx';

const App = () => (
  <>
    <h1 className="text-white">Construindo</h1>
    <div className="bg-white w-full max-w-md rounded rounded-bl-none rounded-tr-none">
      <GeradorCPT>
        <Linha>
          <TitulosCell titulo={['alfA','betA', 'teta']} />
        </Linha>
      </GeradorCPT>
    </div>
  </>
);

export default App;

