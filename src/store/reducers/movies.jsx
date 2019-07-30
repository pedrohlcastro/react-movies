const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action) {
    case 'FOO':
      console.log('BAR');
      break;
    default:
      console.log('SOMETHING');
  }

  return state;
};
