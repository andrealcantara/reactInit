import * as utils from '../Utils.js';
const traducoes = {
  temporada: {
    'en-us': ['winter', 'spring', 'summer', 'fall'],
    'pt-br': ['inverno', 'primavera', 'verão', 'outono']
  }
};

const mesParaTemporada = (mes=0) =>{
  let season  = '';
  let data = Number(mes);

  if(Number.isNaN(data) || data < 1 || data > 12) return '';
  if( data > 9 ) season = traducoes.temporada['en-us'][3];
  else if( data > 6 ) season = traducoes.temporada['en-us'][2];
  else if( data > 3 ) season = traducoes.temporada['en-us'][1];
  else if( data > 0 ) season = traducoes.temporada['en-us'][0];
  return season;
};

const tempoFormatacao = {
  mal:(duracao)=> {
    var duration = new Date(Date.UTC(1970, 0, 1)); // Epoch
    duration.setUTCSeconds(duracao);
    let response = [];
    if(duration.getUTCHours() > 0){
      response.push(duration.getUTCHours()+'H');
    }
    if(duration.getUTCMinutes() > 0){
      response.push(duration.getUTCMinutes()+'Min');
    }
    if(duration.getUTCSeconds() > 0){
      response.push(duration.getUTCSeconds()+'Sec');
    }
    return response.join(' ');
  },
  kitsu:(duracao)=>{
    return duracao + 'Min';
  }
};


const localDefaults = {
  data:{
    naoInfomada:'Não Informado',
    vazia:''
  }
};

const sites = ['mal', 'kitsu'];
const temporadaName = (name) =>{
  const idx = traducoes.temporada['en-us'].indexOf(name);
  if(idx > -1) {
    return traducoes.temporada['pt-br'][idx];
  }
  return '';
};

const Anime = () => {
  function create(id=0,poster='',titulo='',
    temporadaLancamento={ano:'',temporada:''},
    titulosAlternativos={original:'',principal:''},
    tipoMedia='',tempoMedioDuracao=0,generos=[],sinopse='',notaMedia='',studios=[]){
    return {
      id: id,
      poster: poster,
      titulo: titulo,
      temporadaLancamento: temporadaLancamento,
      titulosAlternativos: titulosAlternativos,
      tipoMedia: tipoMedia,
      tempoMedioDuracao: tempoMedioDuracao,
      generos: generos,
      notaMedia: notaMedia,
      sinopse: sinopse,
      studios: studios,
      format: {
        tempo: '',
        temporada: ''
      }
    };
  }

  function temporadaFormatada(data){
    return `${data.temporadaLancamento.temporada.charAt(0).toUpperCase() +
    data.temporadaLancamento.temporada.slice(1)} - ${data.temporadaLancamento.ano}`;
  }


  function generateMyMal(anime={}){
    const poster = anime.main_picture?.larger
      || anime.main_picture?.medium
      || localDefaults.data.vazia;

    const temporada ={
      ano: anime.start_season?.year || localDefaults.data.naoInfomada,
      temporada: temporadaName(anime.start_season?.season.toLowerCase() || localDefaults.data.naoInfomada)};
    const resp = create(anime.id, poster, anime.title, temporada,
      {original: anime.alternative_titles?.synonyms
          || anime.alternative_titles?.ja
        || localDefaults.data.vazia,
      principal: anime.alternative_titles?.en || localDefaults.data.vazia },
      anime.media_type, anime.avarage_episode_duration, anime.genres.map(val => utils.capitalize(val.name)),
      anime.synopsis, anime.mean, anime.studios.map(val => utils.capitalize(val.name, true)) );
    resp.format.tempo = tempoFormatacao.mal(resp.tempoMedioDuracao);
    resp.format.temporada = temporadaFormatada(resp);
    return resp;
  }
  function generateKitsu(obj={}) {
    const anime = obj.attributes;
    const poster = anime.posterImage?.original
      || localDefaults.data.vazia;
    const temporada ={
      ano: anime.startDate?.split('-')[0] || localDefaults.data.naoInfomada,
      temporada: temporadaName(mesParaTemporada(anime.startDate?.split('-')[1])  || localDefaults.data.naoInfomada)};
    const resp = create(obj.id, poster, anime.canonicalTitle, temporada,
      {original: anime.titles?.['ja_jp']
          ?? localDefaults.data.vazia,
      principal: anime.titles?.['en_jp'] ?? localDefaults.data.vazia },
      anime.subtype, anime.episodeLength, obj.genresGerado,
      anime.synopsis, anime.averageRating, obj.studioGerado);
    resp.format.tempo = tempoFormatacao.kitsu(resp.tempoMedioDuracao);
    resp.format.temporada = temporadaFormatada(resp);
    return resp;
  }
  function factory(type='mal', data={}){
    let resp = null;
    let count = 0;
    if(!(sites.includes(type))) return null;
    if (type === sites[count++]) {
      resp = generateMyMal(data);
    }
    if(type === sites[count++]) {
      resp = generateKitsu(data);
    }
    return resp;
  }
  return {
    factory
  };
};

export default Anime;
export {sites};
