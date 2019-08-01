import { ratingsMean } from './index';

const testRatings = [
  {
    Source: 'Internet Movie Database',
    Value: '8.2/10',
  },
  {
    Source: 'Rotten Tomatoes',
    Value: '60%',
  },
  {
    Source: 'Metacritic',
    Value: '70/100',
  },
];

describe('test action helpers', () => {
  it('should calculate ratings mean', (done) => {
    ratingsMean(testRatings)
      .then((res) => {
        expect(res).toEqual(71);
        done();
      });
  });
});
