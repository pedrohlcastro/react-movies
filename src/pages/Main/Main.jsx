import React, { Component } from 'react';
import { connect } from 'react-redux';

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import TextField from '@material-ui/core/TextField';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';


import './main.css';
import movies from '../../services';

class Main extends Component {
  constructor() {
    super();
    this.state = {
      moviesData: [],
      searchMovie: '',
    };
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSubmitSearch = this.handleSubmitSearch.bind(this);
  }

  handleSearchChange(event) {
    this.setState({ searchMovie: event.target.value });
  }

  handleSubmitSearch(event) {
    event.preventDefault();
    const { searchMovie } = this.state;
    movies.seachByTitle(searchMovie)
      .then((res) => {
        console.log(res)
        if (res.ok || !res.data.Reponse.Error) {
          this.setState({ moviesData: res.data.Search });
        } else {
          this.setState({ moviesData: [] });
        }
        console.log(this.state)
      });
  }

  render() {
    const { moviesData, searchMovie } = this.state;
    return (

      <div className="root">
        <GridList cellHeight={180}>
          <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
            <form onSubmit={this.handleSubmitSearch}>
              <TextField
                id="outlined-name"
                label="Titulo"
                placeholder="Ex: Nemo"
                value={searchMovie}
                onChange={this.handleSearchChange}
                margin="normal"
                variant="outlined"
              />
            </form>
          </GridListTile>
          { moviesData.map(movie => (
            <GridListTile key={movie.Poster}>
              <img src={movie.Poster} alt={movie.Title} />
              <GridListTileBar
                title={movie.Title}
                subtitle={<span>{movie.Year}</span>}
                actionIcon={(
                  <IconButton aria-label={`info about ${movie.Title}`}>
                    <InfoIcon />
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

export default connect(
  null,
  null,
)(Main);
