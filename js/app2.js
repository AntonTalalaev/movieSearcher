// THIS IS FOR MAGGIE TESTING ON HER OWN

const movieList = document.querySelector(`.movie-list`);
const getMovies = (movie) => {
  return new Promise((resolve, reject) => {
    const movieRequest = new XMLHttpRequest();

    movieRequest.addEventListener('readystatechange', () => {
      if (movieRequest.readyState === 4 && movieRequest.status === 200) {
        resolve(JSON.parse(movieRequest.responseText));
      } else if (movieRequest.readyState === 4) {
        reject('Error');
      }
    });
    movieRequest.open(
      'GET',
      `http://www.omdbapi.com/?apikey=5b614132&type=movie&s=${movie}​​​​​`
    );
    movieRequest.send();
  });
};

const getIndividualMovie = (movieID) => {
  return new Promise((resolve, reject) => {
    const movieRequest = new XMLHttpRequest();

    movieRequest.addEventListener('readystatechange', () => {
      if (movieRequest.readyState === 4 && movieRequest.status === 200) {
        resolve(JSON.parse(movieRequest.responseText));
      } else if (movieRequest.readyState === 4) {
        reject('Error');
      }
    });
    console.log(movieID);
    movieRequest.open(
      'GET',
      `http://www.omdbapi.com/?apikey=5b614132&type=movie&i=${movieID}​​​​​`
    );
    movieRequest.send();
  });
};

const movieListEle = (moviePosters) => {
  moviePosters.forEach((posterEle) => {
    movieList.insertAdjacentHTML(
      `beforeend`,
      `<div><img class="movie-option" src="${posterEle.Poster}"></div>
      <div class="movie-info">
      <div>${posterEle.Title}</div>
      <div>${posterEle.Rating}</div>
      <div>${posterEle.description}</div>
      </div>`
    );
  });
};

getMovies('Harry')
.then((movies) => {
  const moviePromiseArr = [];
  movies.Search.forEach((movie) => {
    const movieInfoPromise = getIndividualMovie(movie.imdbID);
    movieInfoPromise.then((response) => {
      console.log(response);
    });
    // console.log(movie.imdbID);
    moviePromiseArr.push(movieInfoPromise);
  });
  // Promise.all(moviePromiseArr).then((values) => {
  //   console.log(values);
  // });
});
// movieListEle(movies.Search);
// ON THE HOVER (included with the "zoom in" effect).
