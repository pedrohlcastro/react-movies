import Movies from './movies';


const movies = new Movies();

describe('movies service test', () => {
  it('should get all star wars movies', (done) => {
    movies.seachByTitle('star wars')
      .then((res) => {
        expect(res.ok).toEqual(true);
        expect(res.data.Search.length).toEqual(10);
        done();
      });
  });

  it('should get all star wars movies', (done) => {
    movies.searchById('tt0372784')
      .then((res) => {
        expect(res.ok).toEqual(true);
        expect(res.data.Title).toEqual('Batman Begins');
        done();
      });
  });
});
