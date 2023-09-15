import PropTypes from 'prop-types';
import React from 'react';

const propTypes = {
  children: PropTypes.node,
};
const GeradorCPT = (props) => (
  <table style={{backgroundColor: '#6388C4'}} width="100%" border="0" align="center">
    <tbody>
      <tr>
        <td style={{padding: '20px'}}>
          <table style={{backgroundColor: '#d9e0ec'}} width="100%" border="0" align="center">
            <tbody>
              {props.children}
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>

);

GeradorCPT.propTypes = propTypes;
export default GeradorCPT;
