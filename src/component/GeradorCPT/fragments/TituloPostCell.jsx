/* eslint-disable react/style-prop-object */
import PropTypes from 'prop-types';
import React from 'react';

const propTypes = {
  titulo: PropTypes.string,
  subtitulo: PropTypes.string,
};

const Cell = (props) => (
  <td style={{backgroundColor:'#6388C4',padding:'5px', color:'#FFF'}} colSpan={2} align={'center'}><b><font
    size={5}>{props.titulo}</font></b>{props?.subtitulo ? (
    <>
      {<br />}
      <font size={3}>{props.subtitulo}</font>
    </>) : ''}</td>
);

export default Cell;
Cell.propTypes = propTypes;
