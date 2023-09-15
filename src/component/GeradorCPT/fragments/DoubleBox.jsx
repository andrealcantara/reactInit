import PropTypes from 'prop-types';
import React from 'react';
import TitulosCell from './TitulosCell.jsx';

const propTypes = {
  titulos: PropTypes.array,
  conteudos: PropTypes.array
};


const transformProps =  (props) => {
  let response = {
    titulos: [],
    conteudos: []
  };
  const tamanhoMinimo = Math.min(props.conteudos.length, props.titulos.length);
  response.titulos.push(...props.titulos.slice(0, tamanhoMinimo));
  response.conteudos.push(...props.conteudos.slice(0, tamanhoMinimo));
  response.size = tamanhoMinimo;
  return response;
};

const VariasCaixas = (props) =>  (
  <>
    {props = transformProps(props)}
    <tr valign={'middle'}>
      <TitulosCell titulo={props.titulos} />

    </tr>
  </>
);


VariasCaixas.propType = propTypes;
export default VariasCaixas;
