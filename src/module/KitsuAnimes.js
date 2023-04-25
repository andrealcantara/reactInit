import Anime, { sites, statusFilter} from './anime.js';
import Joi from 'joi';

const typeMedias = ['ona', 'ova', 'tv', 'movie','music','special'];

const getUrl = (ops={}) => {
  const urls = ['/kitsu','anime'];
  const query = [];
  const validation = Joi.number().integer().validate(ops.title);
  if(validation.error) {
    query.push(encodeURI(`filter[text]=${ops.title}`));
    query.push(encodeURI(`filter[status]=${statusFilter.filter(val=> !val.endsWith('_airing') || 
      !val.endsWith('_aired') || 
      val !== 'none').join(' ')}`));
    if(Number.isNaN(Number(ops.limit))) {
      query.push(encodeURI(`page[limit]=${ops.limit}`));
    }
    if(typeMedias.includes(ops.typeMedia)) {
      query.push(encodeURI(`filter[subtype]=${ops.typeMedia}`));
    }
    query.push(encodeURI('sort=-startDate'));
  } else {
    urls.push(validation.value);
  }
  query.push(encodeURI('include=genres,categories,animeProductions.producer'));
  query.push(encodeURI('fields[producers]=name'));
  query.push(encodeURI('fields[genres]=name'));
  query.push(encodeURI('fields[categories]=title'));
  
  return [urls.join('/'), query.join('&')].join('?');
};

const KitsuLoad = async(ops={}) => {
  const schema = Joi.object({
    site: Joi.string().not(Joi.string().empty())
      .custom((val)=>
        sites.includes(val.toLowerCase())?val.toLowerCase() : sites[1]),
    title: [Joi.string().not(Joi.string().empty()).required(), Joi.number().integer().required()],
    limit: Joi.number().integer().default(5),
    typeMedia: Joi.string().not(Joi.string().empty()).custom((value,helpers)=>
      typeMedias.includes(value.toLowerCase()) ? value.toLowerCase() : helpers.error('any.invalid')).default('tv'),
    callback: Joi.function()
  });
  const validation = schema.validate(ops,{abortEarly:false});
  if(validation.error) {
    const response = 'verifique o parametros \n\tops:{\n' +
      '\t\ttitle: string,\n' +
      '\t\tlimit: number,\n' +
      `\t\ttypeMedia: string, \\\\ escolha de uma das opções ${typeMedias.join(',')}\n` +
      '\t\tcallback: function,\n' +
      '\t}\n' +
      `Segue error: \n\t${ validation.error.details.map(map=> map.message).join(',\n\t')}`;

    console.log(response);
    return;
  }
  const urlFormater = getUrl(
    {
      title: validation.value.title,
      limit: validation.value.limit,
      typeMedia: validation.value.typeMedia
    }
  );
  const req = await fetch(urlFormater);
  const resp = await req.json();
  if(resp.errors){
    console.log(resp.errors);
    return;
  }
  if(resp.data) {
    let final = resp.data;
    const validacaoTipoDados = Joi.array().validate(final).error;
    if(resp.included) {
      const genres = [];
      let producers = [];
      let animeProductions = [];
      let categories = [];
      resp.included.forEach(extraContent => {
        if (extraContent.type === 'genres') {
          genres.push(extraContent);
        } else if(extraContent.type === 'categories'){
          categories.push(extraContent);
        } else if (extraContent.type === 'producers') {
          producers.push(extraContent);
        } else if (extraContent.type === 'animeProductions') {
          animeProductions.push({id: extraContent.id, producers: extraContent.relationships.producer.data.id});
        }
      });
      const filterSimpleRelationship = (obj, relationships)=> {
        return ({id}) => obj.relationships[relationships].data?.map(get => get.id).includes(id);
      };
      const atualizarAnime = anime => {
        const generos = genres
          .filter(filterSimpleRelationship(anime,'genres'))
          .map(get => get.attributes.name);
        if(generos.length === 0) {
          generos.push(
            ...(categories
              .filter(filterSimpleRelationship(anime, 'categories'))
              .map(get => get.attributes.title)));
        }
        anime.genresGerado =  generos.sort() || [];
        anime.studioGerado = producers.filter(({id}) =>
          animeProductions.filter(animeProduction_1 =>
            anime.relationships.animeProductions.data.map(animeProduction_2 => animeProduction_2.id)
              .includes(animeProduction_1.id))
            .map(animeProduction_3 => animeProduction_3.producers).includes(id))
          .map(productionName => productionName.attributes.name) || [];
        return anime;
      };
      if(validacaoTipoDados) {
        final = atualizarAnime(final);
      }else{
        final = final.map(atualizarAnime);
      }
    }
    if (validation.value.callback != null) {
      if(validacaoTipoDados) {
        validation.value.callback([Anime().factory(validation.value.site, final)]);
      } else {
        validation.value.callback(final.map(anime => Anime().factory(validation.value.site, anime)));
      }
    }
  }
};

export default KitsuLoad;


