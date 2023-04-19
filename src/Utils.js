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


const time = (duration) => {
  const min = Math.floor(duration / 60);
  const sec = duration % 60;
  return String(min)
    .concat('Min')
    .concat(sec > 0 ? ` ${sec}s` : '');
};

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
const seasonFormat = (season) => {
  let _season =
    season.season.charAt(0).toUpperCase() + season.season.slice(1);
  return `${_season} - ${season.year}`;
};
const listTruncade = (list, size = constantDefault.list.size, token = constantDefault.list.token) => {
  let response = list?.map((val) => val.name).join(token);
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

export {toUpperCase, truncated, time, seasonFormat, listTruncade, capitalize};
