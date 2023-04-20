import * as utils from '../utils/Utils.js';

const traducoes = {
  config:{
    principal: 'en-us',
    nacional: 'pt-br'
  },
  temporada: {
    'en-us': ['winter', 'spring', 'summer', 'fall'],
    'pt-br': ['Inverno', 'Primavera', 'Verão', 'Outono']
  },
  statusAnime: {
    'en-us': ['current','currently_airing', 'finished', 'finished_airing',
      'not_yet_aired', 'upcoming', 'none'],
    'pt-br': ['Em Exibição', 'Em Exibição', 'Finalizado', 'Finalizado',
      'Não Lançado', 'Em Breve', 'Sem Status']
  },
  run: (val, traducao) => {
    const idx = traducao[traducoes.config.principal].indexOf(val);
    if(idx > -1) {
      return traducao[traducoes.config.nacional][idx];
    }
    return '';
  }
};

const mesParaTemporada = (mes=0) =>{
  let season  = '';
  let data = Number(mes);

  if(Number.isNaN(data) || data < 1 || data > 12) return '';
  if( data > 9 ) season = traducoes.temporada[traducoes.config.principal][3];
  else if( data > 6 ) season = traducoes.temporada[traducoes.config.principal][2];
  else if( data > 3 ) season = traducoes.temporada[traducoes.config.principal][1];
  else if( data > 0 ) season = traducoes.temporada[traducoes.config.principal][0];
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
    if(duracao != null) {
      return duracao + 'Min';
    }
    return '';
  }
};


const localDefaults = {
  data:{
    naoInfomada:'Não Informado',
    vazia:''
  }
};

const sites = ['mal', 'kitsu'];

const temporadaNomeNacional = (temporada) =>{
  return traducoes.run(temporada, traducoes.temporada);
};

const statusAnimeNomeNacional = (statusAnime) =>{
  return traducoes.run(statusAnime, traducoes.statusAnime);
};

const Anime = () => {
  function create(id= 0,poster= '',titulo= '',
    temporadaLancamento= {ano:'',temporada:''},
    titulosAlternativos= {original:'',principal:''},
    tipoMedia= '',tempoMedioDuracao= 0,generos= [],
    sinopse= '',notaMedia= '',studios=[], status='none', site='',
    type=''){
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
      status: status,
      site: site,
      type: type,
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


  function generateMyMal(anime={}, type= sites[0]){
    const poster = anime.main_picture?.larger
      || anime.main_picture?.medium
      || localDefaults.data.vazia;

    const temporada ={
      ano: anime.start_season?.year || localDefaults.data.naoInfomada,
      temporada: temporadaNomeNacional(anime.start_season?.season.toLowerCase() || localDefaults.data.naoInfomada)};
    const resp = create(anime.id, poster, anime.title, temporada,
      {original: anime.alternative_titles?.synonyms
          || anime.alternative_titles?.ja
        || localDefaults.data.vazia,
      principal: anime.alternative_titles?.en || localDefaults.data.vazia },
      anime.media_type, anime.average_episode_duration, anime.genres.map(val => utils.capitalize(val.name)),
      anime.synopsis, anime.mean, anime.studios.map(val => utils.capitalize(val.name, true)),
      statusAnimeNomeNacional(anime.status), `https://myanimelist.net/anime/${anime.id}#contentWrapper`, type );
    resp.format.tempo = tempoFormatacao.mal(resp.tempoMedioDuracao);
    resp.format.temporada = temporadaFormatada(resp);
    return resp;
  }
  function generateKitsu(obj={}, type= sites[1]) {
    const anime = obj.attributes;
    const poster = anime.posterImage?.original
      || localDefaults.data.vazia;
    const temporada ={
      ano: anime.startDate?.split('-')[0] || localDefaults.data.naoInfomada,
      temporada: temporadaNomeNacional(mesParaTemporada(anime.startDate?.split('-')[1])
        || localDefaults.data.naoInfomada)};
    const resp = create(obj.id, poster, anime.canonicalTitle, temporada,
      {original: anime.titles?.['ja_jp']
          ?? localDefaults.data.vazia,
      principal: anime.titles?.['en_jp'] ?? localDefaults.data.vazia },
      anime.subtype, anime.episodeLength, obj.genresGerado,
      anime.synopsis, anime.averageRating, obj.studioGerado, statusAnimeNomeNacional(anime.status),
      `https://kitsu.io/anime/${anime.slug}`, type);
    resp.format.tempo = tempoFormatacao.kitsu(resp.tempoMedioDuracao);
    resp.format.temporada = temporadaFormatada(resp);
    return resp;
  }
  function factory(type='mal', data={}){
    let resp = null;
    let count = 0;
    if(!(sites.includes(type))) return null;
    if (type === sites[count++]) {
      resp = generateMyMal(data, type);
    }
    if(type === sites[count++]) {
      resp = generateKitsu(data, type);
    }
    return resp;
  }
  return {
    factory
  };
};

const statusFilter = traducoes.statusAnime[traducoes.config.principal];
const animeStatus = traducoes.statusAnime[traducoes.config.nacional];
export default Anime;
export {sites, statusFilter, animeStatus};
