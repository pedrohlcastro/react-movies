import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';


import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import TextField from '@material-ui/core/TextField';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';


import './main.css';
import { movieActions } from '../../store/actions';


class Main extends Component {
  constructor() {
    super();
    this.state = {
      searchMovie: '',
      elemPerLine: 2,
    };
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSubmitSearch = this.handleSubmitSearch.bind(this);
  }

  componentDidMount() {
    const { innerWidth } = window;
    if (innerWidth < 400) {
      this.setState({ elemPerLine: 1 });
    } else if (innerWidth < 700) {
      this.setState({ elemPerLine: 2 });
    } else {
      this.setState({ elemPerLine: 3 });
    }
  }

  handleSearchChange(event) {
    this.setState({ searchMovie: event.target.value });
  }

  handleSubmitSearch(event) {
    const { fetchMovies, order } = this.props;
    const { searchMovie } = this.state;

    event.preventDefault();
    fetchMovies(searchMovie, order);
  }

  navToInfo(index) {
    const { navToDetails, setCurrent } = this.props;
    setCurrent(index);
    navToDetails(index);
  }

  render() {
    const { moviesData } = this.props;
    const { elemPerLine, searchMovie } = this.state;
    return (

      <div className="root">
        <GridList cols={elemPerLine} cellHeight={350}>
          <GridListTile key="Subheader" cols={elemPerLine} style={{ height: 'auto' }}>
            <form onSubmit={this.handleSubmitSearch}>
              <TextField
                id="search-input"
                label="Titulo"
                placeholder="Ex: Nemo"
                value={searchMovie}
                onChange={this.handleSearchChange}
                margin="normal"
                variant="outlined"
                fullWidth
              />
            </form>
          </GridListTile>
          { moviesData.map((movie, index) => (
            <GridListTile key={movie.Poster}>
              <img src={movie.Poster} alt={movie.Title} />
              <GridListTileBar
                title={movie.Title}
                subtitle={<span>{`${movie.Year} - Rating: ${movie.Details.RatingsMean}%`}</span>}
                actionIcon={(
                  <IconButton aria-label={`info about ${movie.Title}`} onClick={() => this.navToInfo(index)}>
                    <InfoIcon color="error" />
                  </IconButton>
                )}
              />
            </GridListTile>
          ))}
        </GridList>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  moviesData: state.movies.moviesData,
  order: state.movies.orderType,
});

const mapDispatchToProps = dispatch => ({
  fetchMovies: (title, order) => { dispatch(movieActions.fetchMovies(title, order)); },
  setCurrent: (index) => { dispatch(movieActions.setCurrentMovie(index)); },
  navToDetails: (index) => { dispatch(push(`/details/${index}`)); },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Main);
