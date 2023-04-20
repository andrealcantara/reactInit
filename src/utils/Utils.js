import Joi from 'joi';

const constantDefault = {
  text: {
    size: 559,
    end: '[...][Written by MAL Rewrite].',
    separator: ' '
  },
  list:{
    size:50,
    token: ', '
  }
};





const toUpperCase = (str)=> String(str).toUpperCase();


const capitalize = (text, readSpace=false) => {
  let response = text;
  const capitalizeWord = (text)=>{
    let response = text.toLowerCase();
    return response.charAt(0).toUpperCase() + response.slice(1);
  };
  if(typeof text === 'string' && text.length > 1) {
    if(readSpace){
      response = response.split(constantDefault.text.separator).map(val=>capitalizeWord(val))
        .join(constantDefault.text.separator);
    }else{
      response = capitalizeWord(text);
    }
  }
  return response;
};
const listTruncade = (ops={}) => {
  const schema = Joi.object({
    list: Joi.array().required(),
    size: Joi.number().integer().default(constantDefault.list.size),
    token: Joi.string().not(Joi.string().empty()).default(constantDefault.list.token),
    transform: Joi.function().default((val)=>val.name)
  });
  const validation = schema.validate(ops);
  if(validation.error) return `Segue Erros: ${validation.error.details.map(val => val.message).join(', ')}`;
  const list = validation.value.list;
  const size = validation.value.size;
  const token = validation.value.token;
  const transform = validation.value.transform ?? (val => val.name); // Nao estava funcionando no codepen.io o Default do validation.
  let response = list.map(transform).join(token);
  const cutLastGenres = (str) => {
    const vals = String(str).split(token);
    return (vals.length > 1 ? vals.slice(0, vals.length - 1) : vals).join(token);
  };
  while (response.length > size) response = cutLastGenres(response);
  return response;
};

const truncated = (
  str,
  defaultSize = constantDefault.text.size,
  defaultEndTrim = constantDefault.text.end
) => {
  const val = String(str);
  if (defaultSize < val.length) {
    return val
      .substring(0, defaultSize - defaultEndTrim.length)
      .concat(defaultEndTrim);
  }
  return val;
};

export {toUpperCase, truncated, listTruncade, capitalize};
