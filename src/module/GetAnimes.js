import malAnimes from './MalAnimes.js';
import kitsuAnimes from './KitsuAnimes.js';
import {sites} from './anime.js';
import Joi from 'joi';

const GetAnimes = (ops={}) =>  {
  const schema = Joi.object({
    site: Joi.string().not(Joi.string().empty())
      .custom((val)=>
        sites.includes(val.toLowerCase())?val.toLowerCase() : sites[1]),
    title: [Joi.string().not(Joi.string().empty()).required(), Joi.number().integer().required()],
    limit: Joi.number().integer().default(5),
    typeMedia: Joi.allow(),
    callback: Joi.function()
  });

  const validation = schema.validate(ops, {abortEarly:false});

  if(validation.error) {
    return  'verifique o parametros \n\tops:{\n' +
      '\t\ttitle: string,\n' +
      `\t\tsite: string - \\\\ escolha entre os tipos[${sites.join(', ')}]` +
      '\t\tlimit: number,\n' +
      '\t\tcallback: function,\n' +
      '\t}\n' +
      `Segue erros: \n\t${validation.error.details.map(msg=>msg.message).join(',\n\t')}\n`;
  }




  const run = ()=>{
    let count = 0;
    if(validation.value.site === sites[count++]) {
      malAnimes(validation.value);
    }
    if(validation.value.site === sites[count++]) {
      kitsuAnimes(validation.value);
    }
  };
  return {run};
};

export default GetAnimes;

