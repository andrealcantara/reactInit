import ClipboardJS from 'clipboard';
import React, {useEffect} from 'react';
import CaixaCompletaCell from './fragments/CaixaCompletaCell.jsx';
import ImagePost from './fragments/ImagePost.jsx';
import Linha from './fragments/Linha.jsx';
import LinhaEmBranco from './fragments/LinhaEmBranco.jsx';
import VariasCaixas from './fragments/MultiBox.jsx';
import Screenshots from './fragments/Screenshots.jsx';
import TextoLongo from './fragments/TextoLongo.jsx';
import TituloPostCell from './fragments/TituloPostCell.jsx';
import GeradorCPT from './GeradorCpt.jsx';


const App = () => {
  useEffect(() => {
    new ClipboardJS('.btn-copy');
  });
  return (
    <>
      <h1 className="text-white">Construindo</h1>
      <button id="copyContent" className="btn-copy text-gray-300 rounded border-1 border-red-500"
        data-clipboard-action="copy" data-clipboard-target="#bodyPost">Copiar Código
      </button>
      <div id="bodyPost" className="w-full max-w-6xl bg-red-600 p-2 m-1 rounded rounded-bl-none rounded-tr-none">
        <GeradorCPT>
          <CaixaCompletaCell>
            <GeradorCPT>
              <Linha>
                <TituloPostCell titulo="One Piece" subtitulo="Um pirata Mucho Loco"/>
              </Linha>
              <LinhaEmBranco/>
              <VariasCaixas titulos={['alfA', 'betA']}
                conteudos={Array.of(
                  <ImagePost imageUrl={'https://www.infoanime.com.br/poster/2021/nanatsunotaizai4.jpg'}/>,
                  <TextoLongo texto={'Blaa blabla blablablabala baslkaosia oai soa isoais oias o'}/>)}
              />
              <Screenshots imageUrl={['https://a.imagem.app/Ah4Axi.jpg', 'https://a.imagem.app/Ah4bZ8.jpg']}/>
            </GeradorCPT>
          </CaixaCompletaCell>
        </GeradorCPT>

      </div>
    </>
  );
};

export default App;

