import malAnimes from './MalAnimes.js';
import kitsuAnimes from './KitsuAnimes.js';
import {sites} from './anime.js';

const GetAnimes = (ops={}) =>  {
  if(typeof ops?.title !== 'string' ||
    (typeof ops.site !== 'string' && !sites.includes(ops.site)) ||
    (ops.limit != null && Number.isNaN(Number(ops.limit))) ||
    (ops.callback != null && typeof ops.callback !== 'function')) {
    let response = 'verifique o parametros \n\tops:{\n' +
      '\t\ttitle: string,\n' +
      `\t\tsite: string - \\\\ escolha entre os tipos[${sites.join(', ')}]` +
      '\t\tlimit: number,\n' +
      '\t\tcallback: function,\n' +
      '\t}\n';
    return response;
  }


  const run = ()=>{
    let count = 0;
    ops.title = ops.title;
    if(ops.site === sites[count++]) {
      malAnimes(ops);
    }
    if(ops.site === sites[count++]) {
      kitsuAnimes(ops);
    }
  };
  return {run};
};

export default GetAnimes;

