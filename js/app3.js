const urlMain = 'http://www.omdbapi.com/?apikey=71ba4370&type=movie&s=';
const urlMovie = 'http://www.omdbapi.com/?apikey=71ba4370&i=';
const movieListElement = document.querySelector('.movie-list');
const searchbarElement = document.querySelector('.searchbar');

function getMovies(str) {
    return fetch(urlMain + str)
        .then(resp => {
            if (resp.ok) {
                return resp.json();
            } else {
                Promise.reject({ resp: resp.status, resp: resp.statusText });
            }
        })
        .catch(err => {
            console.log(err);
        });
}

function getMovie(id) {
    return fetch(urlMovie + id)
        .then(resp => {
            if (resp.ok) {
                return resp.json();
            } else {
                Promise.reject({ resp: resp.status, resp: resp.statusText });
            }
        })
        .catch(err => {
            console.log(err);
        });
}

searchbarElement.addEventListener('keyup', function (event) {
    if (event.keyCode === 13) {
        movieListElement.innerHTML = '';
        getMovies(searchbarElement.value)
            .then(json => {
                for (const movie of json.Search) {
                    getMovie(movie.imdbID)
                        .then(movieFull => {
                            createAndInsertInnerHTML(movieFull)
                        });
                }
            });
    }
});


function createAndInsertInnerHTML(movie) {
    movieListElement.insertAdjacentHTML('afterbegin',
        `<div class='movie'>
            <img class="movie-option" src="${movie.Poster}">
            <div class="movie-info">
                <div>${movie.Title}</div>
                <div>${movie.imdbRating}</div>
                <div>${movie.Plot}</div>
            </div>
        </div>`
    );
}



