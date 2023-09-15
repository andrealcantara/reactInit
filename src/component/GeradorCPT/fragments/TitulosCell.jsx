import React from 'react';
import PropTypes from 'prop-types';
import {capitalize} from '/src/Utils.js';

const propTypes = {
  titulos: PropTypes.array,
};


const addProporcao = (param) => {
  const proporcao = (100/param.titulos.length).toFixed(2);
  return {
    titulos: param.titulos.map((val, idx) => {return {value: val, proporcao: proporcao, key:idx};}),
  };
};

const HTMLTitulo = (props) =>(
  <td style={{backgroundColor: '#6388C4', padding: '5px', color: '#FFF'}}
    key={props.key}
    align={'center'} width={props.proporcao + '%'}>{capitalize(props.titulo)}</td>
);

const Titulo = (props) => (
  <>
    {props = addProporcao(props)}
    {props.titulos.filter(val => typeof val.value === 'string').map((item, key) => (
      <HTMLTitulo key={key} titulo={item.value} propocao={item.proporcao} />
    ))}
  </>
);

Titulo.propTypes = propTypes;
export default Titulo;
