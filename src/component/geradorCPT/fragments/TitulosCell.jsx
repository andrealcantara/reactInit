import React from 'react';
import PropTypes from 'prop-types';
import {capitalize} from '/src/Utils.js';

const propTypes = {
  titulos: PropTypes.arrayOf(PropTypes.string),
};

const Titulo = (props) => (
  <>
    {props.titulos.map((item, key, arr) => (
      <td style={{backgroundColor: '#6388C4', padding: '5px', color: '#FFF'}} key={key} align={'center'}
        width={(100/arr.length).toFixed(2) + '%'}>{capitalize(item)}</td>
    ))}
  </>
);

Titulo.propTypes = propTypes;
export default Titulo;
