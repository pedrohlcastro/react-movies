import React from 'react';
import { connect } from 'react-redux';

import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';

import './details.css';

const Details = ({ movie, history }) => {
  const handleBack = (event) => {
    event.preventDefault();
    history.goBack();
  };

  return (
    <Container>
      <header className="poster">
        <Fab color="primary" aria-label="back" id="back-btn" onClick={handleBack}>
          <ArrowLeftIcon style={{ fontSize: 30 }} />
        </Fab>
        <img src={movie.Poster} alt="poster" width="100%" height="500px" />
      </header>
      <Paper className="info">
        <Typography variant="h5" component="h3">
          {movie.Title}
        </Typography>
        <Typography component="p">
          {movie.Details.Plot}
        </Typography>
      </Paper>
    </Container>
  );
};

const mapStateToProps = state => ({
  movie: state.movies.movie,
});

export default connect(
  mapStateToProps,
  null,
)(Details);
