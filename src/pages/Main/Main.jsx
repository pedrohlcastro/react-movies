import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';


import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import TextField from '@material-ui/core/TextField';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import CircularProgress from '@material-ui/core/CircularProgress';

import './main.css';
import { movieActions } from '../../store/actions';


class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchMovie: '',
      elemPerLine: 2,
    };

    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSubmitSearch = this.handleSubmitSearch.bind(this);
    this.handleChangeOrder = this.handleChangeOrder.bind(this);
    this.handleChangeDirection = this.handleChangeDirection.bind(this);
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
    event.preventDefault();

    const { fetchMovies, order } = this.props;
    const { searchMovie } = this.state;

    fetchMovies(searchMovie, order);

    this.setState({ searchMovie: '' });
  }

  navToInfo(index) {
    const { navToDetails, setCurrent } = this.props;
    setCurrent(index);
    navToDetails(index);
  }

  handleChangeOrder(event) {
    const { changeOrder, moviesData, orderDirection } = this.props;

    changeOrder(moviesData, event.target.value, orderDirection);
  }

  handleChangeDirection(event) {
    const { changeOrder, moviesData, order } = this.props;

    changeOrder(moviesData, order, event.target.value);
  }

  renderOrder() {
    const {
      moviesData, order, isLoading, orderDirection,
    } = this.props;

    if (moviesData.length && !isLoading) {
      return (
        <span>
          <InputLabel htmlFor="order-picker">
              Ordernar por
          </InputLabel>
          <Select
            value={order}
            onChange={this.handleChangeOrder}
            input={<OutlinedInput name="order" id="order-picker" />}
          >
            <MenuItem value="name">Nome</MenuItem>
            <MenuItem value="ratings">Média das avaliações</MenuItem>
          </Select>
          <InputLabel htmlFor="direction-picker">
              Sentido da ordenação
          </InputLabel>
          <Select
            value={orderDirection}
            onChange={this.handleChangeDirection}
            input={<OutlinedInput name="direction" id="direction-picker" />}
          >
            <MenuItem value="acs">Crescente</MenuItem>
            <MenuItem value="desc">Decrescente</MenuItem>
          </Select>
        </span>
      );
    }
    return null;
  }

  renderLoading() {
    const { isLoading } = this.props;
    if (isLoading) {
      return (
        <CircularProgress className="progress" />
      );
    }
    return null;
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
                label="Nome do filme"
                placeholder="Ex: Nemo"
                value={searchMovie}
                onChange={this.handleSearchChange}
                margin="normal"
                variant="outlined"
                fullWidth
              />
            </form>
          </GridListTile>
          <GridListTile key="filter-direction" cols={elemPerLine} style={{ height: 'auto' }}>
            {this.renderLoading()}
            {this.renderOrder()}
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
  orderDirection: state.movies.orderDirection,
  isLoading: state.movies.isLoading,
});

const mapDispatchToProps = dispatch => ({
  fetchMovies: (title, order) => { dispatch(movieActions.fetchMovies(title, order)); },
  setCurrent: (index) => { dispatch(movieActions.setCurrentMovie(index)); },
  navToDetails: (index) => { dispatch(push(`/details/${index}`)); },
  changeOrder: (moviesData, type, direction) => {
    dispatch(movieActions.orderBy(moviesData, type, direction));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Main);
