import Anime from './anime.js';

const fields = ['main_picture', 'title', 'start_season', 'media_type', 'alternative_titles',
  'average_episode_duration', 'genres', 'synopsis', 'mean', 'studios', 'broadcast', 'end_date',
  'num_episodes', 'popularity', 'rank', 'rating', 'source', 'start_date',
  'status'];

const getUrl = (ops ={}) => {
  const urls = ['/mal','anime'];
  if(typeof ops.title !== 'string') return '';
  const limit = ops.limit && !Number.isNaN(Number(ops.limit)) ? Number(ops.limit) : 5;
  const queryFields = ops.fullFields ? fields: fields.slice(0,fields.indexOf('studios')+1) ;
  const query = [`q='${ops.title}'`,`limit=${limit}`, `fields=${queryFields.join(',')}`];
  return [urls.join('/'), query.join('&')].join('?');
};
const MalAnimes = async(ops={}) => {
  if(typeof ops?.title !== 'string' ||
  (ops.limit != null && Number.isNaN(Number(ops.limit))) ||
    (ops.callback != null && typeof ops.callback !== 'function')) {
    return 'verifique o parametros \n\tops:{\n' +
      '\t\ttitle: string,\n' +
      '\t\tlimit: number,\n' +
      '\t\tcallback: function,\n' +
      '\t}\n';
  }

  const req = await fetch(
    getUrl(
      {
        title: ops.title,
        limit: ops.limit || 5
      }
    )
  );
  const resp = await req.json();
  if(ops.callback != null) {
    ops.callback(resp.data.map((anime) => Anime().factory(ops.site, anime.node)));
  }
};
export default MalAnimes;
