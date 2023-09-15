


function validArray(value, genericValidadte) {
  let response =  Array.isArray(value) && value.length > 0;
  if (typeof genericValidadte === 'function') {
    response &= value.every(genericValidadte);
  }
  return response;
}
function validateNumber(value) {
  return validArray(value, (val) => !isNaN(parseInt(val)) && isFinite(val));
}

function validateString(value) {
  return validArray(value, (val) => typeof val === 'string' && val.length > 0);
}

const arrayIntegerType = (props, propName, componentName)  => {

};
