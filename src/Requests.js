const key = "c10f9db4154f01a873036f5cf83a51e0";
const BASE_URL = "https://api.themoviedb.org/3";
const LANGUAGE = "en-US";
const PAGE = 1;

const requests = {
  requestPopular: `${BASE_URL}/movie/popular?api_key=${key}&language=${LANGUAGE}&page=${PAGE}`,
  requestTopRated: `${BASE_URL}/movie/top_rated?api_key=${key}&language=${LANGUAGE}&page=${PAGE}`,
  requestTrending: `${BASE_URL}/trending/movie/day?api_key=${key}&language=${LANGUAGE}`,
  requestHorror: `${BASE_URL}/search/movie?api_key=${key}&language=${LANGUAGE}&query=horror`,
  requestUpcoming: `${BASE_URL}/movie/upcoming?api_key=${key}&language=${LANGUAGE}&page=${PAGE}`,
};

export default requests;