import MalAnimes from './MalAnimes.jsx';
import KitsuAnimes from './KitsuAnimes.jsx';
import {sites} from './Anime.jsx';

const GetAnimes = (ops={}) =>  {

  if(typeof ops?.title !== 'string' ||
    (typeof ops.site !== 'string' && !sites.includes(ops.site)) ||
    (ops.limit != null && Number.isNaN(Number(ops.limit))) ||
    (ops.callback != null && typeof ops.callback !== 'function')) {
    return 'verifique o parametros \n\tops:{\n' +
      '\t\ttitle: string,\n' +
      `\t\tsite: string - \\\\ escolha entre os tipos[${sites.join(', ')}]` +
      '\t\tlimit: number,\n' +
      '\t\tcallback: function,\n' +
      '\t}\n';

  }


  const run = ()=>{
    let count = 0;
    // ops.title = ops.title;
    if(ops.site === sites[count++]) {
      MalAnimes(ops).then();
    }
    if(ops.site === sites[count++]) {
      KitsuAnimes(ops).then();
    }
  };
  return {run};
};

export default GetAnimes;

