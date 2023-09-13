import React from 'react';
import PropTypes from 'prop-types';
import {capitalize} from '/src/Utils.js';

const propTypes = {
  titulo: PropTypes.array,
};
const Fragmento = (props) => (
  <>
    {props.titulo.slice(0, 2).filter(val => typeof val === 'string').map((item, key) => (
      <td key={key} style={{backgroundColor: '#6388C4',padding: '5px', color: '#FFF'}}
        align="center">{capitalize(item)}</td>
    ))}
  </>
);

Fragmento.propTypes = propTypes;
export default Fragmento;
