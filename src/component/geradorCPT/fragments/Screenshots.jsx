import PropTypes from 'prop-types';
import React from 'react';

const propTypesScreenshot = {
  imageUrl: PropTypes.arrayOf(PropTypes.string),
  colSpan: PropTypes.number,
};
const defaultPropsScreen = {
  colSpan: 2,
};

const TituloScreenshots = (props) => (
  <tr valign={'middle'}>
    <td style={{backgroundColor: '#6388C4', padding:'5px', color:'#FFF'}} colSpan={props.colSpan} align={'center'}>
      {'ScreenShots'}
    </td>
  </tr>
);


// const ImageScreenshots = (props) => {
//   const htmlPadrao = useState('<img src='+props.url+' width={\'200\'}>');
//   return ({ __html: htmlPadrao});
// };
const PanelScreenshots = (props) => {
  const genImagePadrao = (itens) => {
    let _html = [];
    _html.push(itens.map(item =>
      '<a href='+item+' data-ipslightbox="" ><img src='+item+' width="200"></a>').join(' '));
    _html.push('<br>');
    _html.push('Clique na imagem para ver em tamanho real');
    return {__html: _html.join('\n')};
  };
  return (

    <tr valign={'middle'}>
      <td colSpan={props.colSpan} align={'center'} dangerouslySetInnerHTML={genImagePadrao(props.imageUrl)}>
        {/*{props.imageUrl.map((item, idx, arr) => (*/}
        {/*  <React.Fragment key={idx}>*/}
        {/*    <a href={item} data-ipslightbox="" dangerouslySetInnerHTML={{ __html: genImagePadrao(item)}}></a>*/}
        {/*    {arr.length - 1 !== idx ? ' ' : ''}*/}
        {/*  </React.Fragment>*/}
        {/*))}*/}
        {/*<br/>*/}
        {/*{'Clique na imagem para ver em tamanho real'}*/}
      </td>
    </tr>
  );
};

const Screenshots = (props) => (
  <>
    <TituloScreenshots colSpan={props.colSpan}/>
    <PanelScreenshots colSpan={props.colSpan} imageUrl={props.imageUrl} />
  </>
);

Screenshots.defaultProps = defaultPropsScreen;
Screenshots.propTypes = propTypesScreenshot;
export default Screenshots;

