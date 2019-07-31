import React from 'react';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';
// import movies from '../services';

const Main = () => (
  <div>
    <Button variant="contained" color="primary">
      Hello World
    </Button>
  </div>
);

export default connect(
  null,
  null,
)(Main);
