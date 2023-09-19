import PropTypes from 'prop-types';
import React from 'react';



const propTypesImagePost = {
  imageUrl: PropTypes.string
};

const ImagePost = (props) => (
  <div style={{textAlign: 'center'}}>
    <img src={props.imageUrl} alt={props.imageUrl}
      style={{minWidth:'300px', textAlign:'center', maxHeight:'400px'}}  />
  </div>
);

ImagePost.propTypes = propTypesImagePost;
export default ImagePost;
