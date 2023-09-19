import PropTypes from 'prop-types';
import React from 'react';

const propTypesTextoLongo = {
  texto: PropTypes.string
};

const TextoLongo = (props) => (
  <div style={{textAlign: 'justify', textJustify: 'inter-word'}}>
    {props.texto}
  </div>
);
TextoLongo.propTypes = propTypesTextoLongo;
export default TextoLongo;
