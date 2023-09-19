import PropTypes from 'prop-types';
import React from 'react';

const propTypes = {
  conteudos: PropTypes.arrayOf(PropTypes.node),
  valing: PropTypes.arrayOf(PropTypes.oneOf(['top','middle'])),
  valingAll: PropTypes.oneOf(['top','middle'])
};


const CaixaCell = (props) => (
  <>
    {props.conteudos.map((item, idx, arr)=>(
      <td key={idx} style={{padding:'15px'}} width={(100/arr.length).toFixed(2)+'%'}
        valign={props.valingAll ? props.valingAll: props.valing?.length > 0 ? props.valing[idx] : ''}>
        {item}
      </td>
    ))}
  </>
);

CaixaCell.propTypes = propTypes;
export default CaixaCell;
