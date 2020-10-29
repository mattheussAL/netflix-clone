const API_KEY = '94186f1d1c62ddbdb56955f589acd952';
const API_BASE = 'https://api.themoviedb.org/3';

const getApi = async (endpoint) => {
  const res = await fetch(`${API_BASE}${endpoint}`);
  const data = await res.json();

  return data;
}


export default {
  getHomeList: async () => {
    return [
      {
        slug: 'originals',
        title: 'Originals of Netflix',
        items: await getApi(`/discover/tv?with_network=213&language=pt-BR&api_key=${API_KEY}`),
      },
      {
        slug: 'trending',
        title: 'Recommended for you',
        items:  await getApi(`/trending/all/week?language=pt-BR&api_key=${API_KEY}`),
      },
      {
        slug: 'toprated',
        title: 'Rising',
        items:  await getApi(`/movie/top_rated?language=pt-BR&api_key=${API_KEY}`),      
      },
      {
        slug: 'action',
        title: 'Action',
        items:  await getApi(`/discover/movie?with_genres=28&language=pt-BR&api_key=${API_KEY}`),
      },
      {
        slug: 'comedy',
        title: 'Comedy',
        items:   await getApi(`/discover/movie?with_genres=35&language=pt-BR&api_key=${API_KEY}`),
      },
      {
        slug: 'horror',
        title: 'Horror',
        items:   await getApi(`/discover/movie?with_genres=27&language=pt-BR&api_key=${API_KEY}`),
      },
      {
        slug: 'romance',
        title: 'Romance',
        items:   await getApi(`/discover/movie?with_genres=10749&language=pt-BR&api_key=${API_KEY}`),
      },
      {
        slug: 'documentary',
        title: 'Documentary',
        items:   await getApi(`/discover/movie?with_genres=99&language=pt-BR&api_key=${API_KEY}`),
      }
    ]
  },

  getMovieInfo: async (movieId, type) => {
    let info = {}

    if(movieId) {
      switch(type){
        case 'movie': 
          info = await getApi(`/movie/${movieId}?language=pt-BR&api_key=${API_KEY}`)
        break;
        case 'tv':
          info = await getApi(`/tv/${movieId}?language=pt-BR&api_key=${API_KEY}`)
        break;
        default:
          info = null
        break;
      }
    }

    return info;
  }
}