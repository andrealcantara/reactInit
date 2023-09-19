import PropTypes from 'prop-types';
import React from 'react';
import CaixaCell from './CaixaCell.jsx';
import TitulosCell from './TitulosCell.jsx';

const propTypes = {
  titulos: PropTypes.arrayOf(PropTypes.string),
  conteudos: PropTypes.arrayOf(PropTypes.node),
  valing: PropTypes.arrayOf(PropTypes.oneOf(['top','middle'])),
  valingAll: PropTypes.oneOf(['top','middle'])
};

const VariasCaixas = (props) =>  (
  <>
    {/*{props}*/}
    <tr valign={'middle'}>
      <TitulosCell titulos={props.titulos} />
    </tr>
    <tr>
      <CaixaCell conteudos={props.conteudos} valingAll={props.valingAll} valing={props.valing} />
    </tr>
  </>
);


VariasCaixas.propTypes = propTypes;
export default VariasCaixas;
