import PropTypes from 'prop-types';
import React from 'react';

const propTypes = {
  children: PropTypes.node,
};
const GeradorCPT = (props) => (
  <div id="bodyPost">
    <table style={{width:'100%', border:'0',  backgroundColor:'#6388C4'}} width="100%" border="0" align="center">
      <tbody className="text-white">
        {props.children}
      </tbody>
    </table>
  </div>

);

GeradorCPT.propTypes = propTypes;
export default GeradorCPT;
