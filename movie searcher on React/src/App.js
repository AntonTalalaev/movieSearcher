import './styles/App.css';
import React, { Component } from 'react';
import Header from './components/Header';
import MovieContainer from './components/MovieContainer';

class App extends Component {

  baseURL = 'https://api.themoviedb.org/3/search/movie';
  APIKey = '4f988b1ac25241f58cac72c2612e28ec';
  URLparams = `&language=en-US&page=1&include_adult=false&query=`;
  url = `${this.baseURL}?api_key=${this.APIKey}${this.URLparams}`;

  state = {
    movies: [],
    likes: []
  };

  /**
   * Method to make API call and store results in this.state.movies
   * @param {string} queryStr - string to search movie 
   */
  queryMovies = (queryStr) => {
    fetch(this.url + queryStr)
      .then(result => result.json())
      .then(data => this.setState({ movies: data.results }));
  };

  /**
   * Handler to perform a search
   * @param {string} queryStr - string to search movie 
   */
  handleSearch = (queryStr) => {
    if (queryStr !== undefined && queryStr !== null && queryStr !== "") {
      this.queryMovies(queryStr);
    } else {
      this.setState({ movies: [] });
    }
  }

  /**
   * Handler to perform pressing 'like' button
   * @param {Number} id - id of movie
   */
  handleLikeMovie = (id) => {
    const index = this.state.likes.indexOf(id);

    if (index === -1) {
      this.setState({
        likes: [...this.state.likes, id]
      })
    } else {
      this.setState({
        likes: [...this.state.likes.filter((item) => item !== id)]
      })
    }
  }

  /**
   * Render method
   */
  render() {
    return (
      <React.Fragment>
        <Header handleSearch={this.handleSearch} />
        {(this.state.movies.length > 0) &&
          <MovieContainer handleLikeMovie={this.handleLikeMovie} likes={this.state.likes} movies={this.state.movies} />}
      </React.Fragment >
    );
  }
}

export default App;