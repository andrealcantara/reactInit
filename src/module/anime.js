import * as utils from '../Utils.js';
const traducoes = {
  temporada: {
    'en-us': ['winter', 'spring', 'summer', 'fall'],
    'pt-br': ['inverno', 'primavera', 'verão', 'outono']
  }
};

const tempoFormatacao = {
  mal:(duracao)=> {
    const min = Math.floor(duracao / 60);
    const sec = duracao % 60;
    return String(min)
      .concat('Min')
      .concat(sec > 0 ? ` ${sec}s` : '');
  }
};

const localDefaults = {
  data:{
    naoInfomada:'Não Informado',
    vazia:''
  }
};
const temporadaName = (name) =>{
  const idx = traducoes.temporada['en-us'].indexOf(name);
  if(idx > -1) {
    return traducoes.temporada['pt-br'][idx];
  }
  return '';
};

class Anime {
  constructor(id=0,poster='',titulo='',
    temporadaLancamento={ano:'',temporada:''},
    titulosAlternativos={original:'',principal:''},
    tipoMedia='',tempoMedioDuracao=0,generos=[],sinopse='',notaMedia='',studios=[]){
    this.id = id;
    this.poster = poster;
    this.titulo = titulo;
    this.temporadaLancamento = temporadaLancamento;
    this.titulosAlternativos = titulosAlternativos;
    this.tipoMedia = tipoMedia;
    this.tempoMedioDuracao=tempoMedioDuracao;
    this.generos= generos;
    this.notaMedia = notaMedia;
    this.sinopse = sinopse;
    this.studios = studios;
    this._formatacaoTempo = null;
  }

  temporadaFormatada(){
    return `${this.temporadaLancamento.temporada.charAt(0).toUpperCase() + 
      this.temporadaLancamento.temporada.slice(1)} - ${this.temporadaLancamento.ano}`;
  }

  tempoFormatado(){
    return this._formatacaoTempo(this.tempoMedioDuracao);
  }

  static generateMyMal(anime={}){
    const poster = anime.main_picture?.larger
      || anime.main_picture?.medium
      || localDefaults.data.vazia;

    const temporada ={
      ano: anime.start_season?.year || localDefaults.data.naoInfomada,
      temporada: temporadaName(anime.start_season?.season.toLowerCase() || localDefaults.data.naoInfomada)};
    const resp = new Anime(anime.id, poster, anime.title, temporada,
      {original: anime.alternative_titles?.synonyms
          || anime.alternative_titles?.ja
        || localDefaults.data.vazia,
      principal: anime.alternative_titles?.en || localDefaults.data.vazia },
      anime.media_type, anime.avarage_episode_duration, anime.genres.map(val => utils.capitalize(val.name)),
      anime.synopsis, anime.mean, anime.studios.map(val => utils.capitalize(val.name, true)) );
    resp._formatacaoTempo = tempoFormatacao.mal;
    return resp;
  }
}
