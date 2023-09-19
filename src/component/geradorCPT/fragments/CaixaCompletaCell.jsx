import PropTypes from 'prop-types';
import React from 'react';


const propTypes = {
  propTypes: PropTypes.node,
};
const  CaixaCompletaCell = (props) =>(
  <>
    <tr><td colSpan={3}></td></tr>
    <tr>
      <td></td>
      <td style={{padding:'20px'}}>{props.children}</td>
      <td></td>
    </tr>
    <tr><td colSpan={3}></td></tr>
  </>
);

CaixaCompletaCell.propTypes = propTypes;
export default CaixaCompletaCell;
