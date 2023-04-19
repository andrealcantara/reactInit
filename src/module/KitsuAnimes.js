import Anime from './anime.js';

const typeMedias = ['ona', 'ova', 'tv', 'movie','music','special'];

const getUrl = (ops={}) => {
  const urls = ['/kitsu','anime'];
  const query = [];
  query.push(`filter[text]='${ops.title}'`);
  query.push('include=genres,animeProductions.producer');
  query.push('fields[producers]=name');
  query.push('fields[genres]=name');
  if(Number.isNaN(Number(ops.limit))) {
    query.push(`page[limit]=${ops.limit}`);
  }
  if(typeMedias.includes(ops.typeMedia)) {
    query.push(`filter[subtype]=${ops.typeMedia}`);
  }

  
  return [urls.join('/'), query.join('&')].join('?');
};

const KitsuLoad = async(ops={}) => {
  if(typeof ops?.title !== 'string' ||
    (ops.limit != null && Number.isNaN(Number(ops.limit))) ||
    (ops.typeMedia != null && !typeMedias.includes(ops.typeMedia.toLowerCase())) ||
    (ops.callback != null && typeof ops.callback !== 'function')) {
    const response = 'verifique o parametros \n\tops:{\n' +
      '\t\ttitle: string,\n' +
      '\t\tlimit: number,\n' +
      `\t\ttypeMedia: string, \\\\ escolha de uma das opções ${typeMedias.join(',')}\n` +
      '\t\tcallback: function,\n' +
      '\t}\n';
    console.log(response);
    return;
  }
  const req = await fetch(
    getUrl(
      {
        title: ops.title,
        limit: ops.limit || 5,
        typeMedia: ops.typeMedia?.toLowerCase() || 'tv'
      }
    )
  );
  const resp = await req.json();
  if(resp.errors){
    console.log(resp.errors);
    return;
  }
  const genres= [];
  let producers = [];
  let animeProductions = [];
  resp.included.forEach(extraContent =>{
    if(extraContent.type === 'genres'){
      genres.push(extraContent);
    } else if(extraContent.type === 'producers'){
      producers.push(extraContent);
    } else if(extraContent.type === 'animeProductions'){
      animeProductions.push({id:extraContent.id, producers:extraContent.relationships.producer.data.id});
    }
  });

  const final = resp.data.map(anime => {
    anime.genresGerado = genres
      .filter(({id})=> anime.relationships.genres.data?.map(genres => genres.id).includes(id))
      .map(genres=>genres.attributes.name) || [];
    anime.studioGerado = producers.filter(({id})=>
      animeProductions.filter(animeP=>
        anime.relationships.animeProductions.data.map(animeP=>animeP.id)
          .includes(animeP.id))
        .map(animeP=>animeP.producers).includes(id))
      .map(prod => prod.attributes.name) || [];
    return anime;
  });
  if(ops.callback != null) {
    ops.callback(final.map(anime => Anime().factory(ops.site, anime)));
  }
};

export default KitsuLoad;


