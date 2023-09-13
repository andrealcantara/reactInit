import PropTypes from 'prop-types';
import React from 'react';

const propTypes = {
  children: PropTypes.node
};

const Linha = (props) => (
  <tr valign="middle">
    {props.children}
  </tr>
);

Linha.propTypes = propTypes;
export default Linha;
