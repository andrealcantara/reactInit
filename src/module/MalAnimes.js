import Anime, {sites} from './anime.js';
import Joi from 'joi';

const fields = ['main_picture', 'title', 'start_season', 'media_type', 'alternative_titles',
  'average_episode_duration', 'genres', 'synopsis', 'mean', 'status', 'studios', 'broadcast', 'end_date',
  'num_episodes', 'popularity', 'rank', 'rating', 'source', 'start_date'];

const getUrl = (ops ={}) => {
  const urls = ['/mal','anime'];
  const schema = Joi.object({
    title: [Joi.string().not(Joi.string().empty()).required(), Joi.number().integer().required()],
    limit: Joi.number().integer().default(5),
    fullFields: Joi.boolean().default(false)
  });
  const validation = schema.validate(ops, {abortEarly:false});
  const queryFields = validation.value.fullFields ? fields: fields.slice(0,fields.indexOf('studios')+1) ;
  const query = [`fields=${queryFields.join(',')}`];

  if(validation.error){
    console.log(`[${validation.error.details.map(map=>map.message).join(', ')}]`);
    return '';
  } else {
    const isId = Joi.number().integer().validate(validation.value.title);
    if(isId.error) {
      query.push(`q='${validation.value.title}'`);
      query.push(`limit=${validation.value.limit}`);
    }else{
      urls.push(String(isId.value));
    }
    return [urls.join('/'), query.join('&')].join('?');
  }
};
const MalAnimes = async(ops={}) => {
  const schema = Joi.object({
    site: Joi.string().not(Joi.string().empty())
      .custom((val)=>
        sites.includes(val.toLowerCase()) ? val.toLowerCase() : sites[0]),
    title: [Joi.string().not(Joi.string().empty()).required(), Joi.number().integer().required()],
    limit: Joi.number().integer().default(5),
    callback: Joi.function()
  });
  const validation = schema.validate(ops,{abortEarly: false});
  if(validation.error) {
    return 'verifique o parametros \n\tops:{\n' +
      '\t\ttitle: string,\n' +
      '\t\tlimit: number,\n' +
      '\t\tcallback: function,\n' +
      '\t}\n' +
      `Segue os erros:\n\t${validation.error.details.map(msg => msg.message).join(',\n\t')}\n`;
  }

  const req = await fetch(
    getUrl(
      {
        title: validation.value.title,
        limit: validation.value.limit
      }
    )
  );
  const resp = await req.json();
  if(validation.value.callback != null) {
    if(resp.data) {
      validation.value.callback(resp.data.map((anime) => Anime().factory(validation.value.site, anime.node)));
    }else{
      validation.value.callback([Anime().factory(validation.value.site,resp)]);
    }
  }
};
export default MalAnimes;
