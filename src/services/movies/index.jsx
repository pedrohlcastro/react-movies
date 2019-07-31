import { create } from 'apisauce';

class Movies {
  constructor() {
    this.api = create({
      baseURL: 'http://www.omdbapi.com',
      params: { apikey: process.env.REACT_APP_OMDB_KEY },
      headers: { Accept: 'application/json' },
    });
  }

  async seachByTitle(title, page = 1) {
    const res = await this.api.get('/', { s: title, page });
    return res.data.Search || [];
  }

  searchById(id) {
    return this.api.get('/', { i: id });
  }
}

export default Movies;
