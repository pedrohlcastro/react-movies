export const ratingsMean = async (ratings) => {
  let mean = 0;

  await Promise.all(ratings.map((rating) => {
    const stringValue = rating.Value;
    const splitedValue = stringValue.split('/');

    switch (rating.Source) {
      case 'Internet Movie Database':
        mean += parseFloat(splitedValue[0] * 10);
        break;
      case 'Rotten Tomatoes':
        mean += parseFloat(stringValue.slice(0, -1));
        break;
      case 'Metacritic':
        mean += parseFloat(splitedValue[0]);
        break;
      default:
        mean += 0;
    }
    return null;
  }));

  return Promise.resolve(Math.round(mean / ratings.length));
};
