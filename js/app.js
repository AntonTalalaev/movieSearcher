// http://www.omdbapi.com/?apikey=71ba4370&type=movie&s=NameOfTheMovie
//

const movieList = document.querySelector(`.movie-list`);
const getMovies = (imdbID) => {
  return new Promise((resolve, reject) => {
    const movieRequest = new XMLHttpRequest();

    movieRequest.addEventListener('readystatechange', () => {
      if (movieRequest.readyState === 4 && movieRequest.status === 200) {
        resolve(JSON.parse(movieRequest.responseText));
      } else if (movieRequest.readyState === 4) {
        reject('No movie found');
      }
    });
    movieRequest.open(
      'Get',
      `https://www.omdbapi.com/?apikey=71ba437&i=${​​​​​imdbID}​​​​​`
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
getMovies('Harry Potter').then((movies) => movieListEle(movies.Search));

// ON THE HOVER (included with the "zoom in" effect).
