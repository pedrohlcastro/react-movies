import { create } from 'apisauce';

class Movies {
  constructor() {
    this.api = create({
      baseURL: 'http://www.omdbapi.com',
      params: { apikey: process.env.REACT_APP_OMDB_KEY },
      headers: { Accept: 'application/json' },
    });
  }

  seachByTitle(title, page = 1) {
    return this.api.get('/', { s: title, page });
  }

  searchById(id) {
    return this.api.get('/', { i: id });
  }
}

export default Movies;
