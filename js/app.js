// Key - 4f988b1ac25241f58cac72c2612e28ec

// Genres:
// https://api.themoviedb.org/3/genre/movie/list?api_key=4f988b1ac25241f58cac72c2612e28ec&language=en-US
// results[index].genre_ids - array of genres of movie


// Trending:
// https://api.themoviedb.org/3/trending/movie/day?api_key=4f988b1ac25241f58cac72c2612e28ec


const key = '4f988b1ac25241f58cac72c2612e28ec';
const url = 'https://api.themoviedb.org/3'
const periodOfSearch = 'day'; // day/week
const urlMovieTrending = `${url}/trending/movie/${periodOfSearch}?api_key=${key}`;
const urlMovieGenres = `${url}/genre/movie/list?api_key=${key}&language=en-US`;


const rootElement = document.getElementById("root");

console.log(urlMovieTrending);
console.log(urlMovieGenres);



const filterMoviesByGenre = function (genreId, movies) {
    let movieIndexes = [];
    for (let i = 0; i < movies.length; i++) {
        const movie = movies[i];
        if (movie.genre_ids.includes(genreId)) {
            movieIndexes.push(i);
        }
    }
    return movieIndexes;
}


const createGenreSection = function (genre) {
    const genreSectionElement = document.createElement('div');
    genreSectionElement.classList.add('titleList');
    genreSectionElement.innerHTML =
        `<div class="title">
            <h1>${genre}</h1>
            <div class="titles-wrapper">
            </div>
         </div>`
    rootElement.insertAdjacentElement('beforeend', genreSectionElement);
    return genreSectionElement;
}


const insertMovies = function (movieIndexes, movies, genreSectionElement) {
    movieIndexes.forEach(i => {
        let movie = movies[i];
        genreSectionElement.querySelector('.titles-wrapper').insertAdjacentHTML('beforeend',
            `<div class="movie">
                <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" />
                <div class="overlay">
                    <div class="title">${movie.title}</div>
                    <div class="rating">${movie.vote_average}</div>
                    <div class="plot">${movie.overview}</div>
                    <div class="listToggle">
                        <div>
                            <i class="fa fa-fw fa-plus"></i>
                            <i class="fa fa-fw fa-check"></i>
                        </div>
                    </div>
                </div>
            </div>`);
    })

}



const searchMovies = function () {
    fetch(urlMovieTrending)
        .then(resp => {
            if (resp.ok) {
                return resp.json();
            } else {
                throw new Error("Error: urlMovieTrending call exception.");
            }
        })
        .then(jsonMovieTrending => {
            const movies = jsonMovieTrending.results;
            console.log(movies);
            fetch(urlMovieGenres)
                .then(resp => {
                    if (resp.ok) {
                        return resp.json();
                    } else {
                        throw new Error("Error: urlMovieGenres call exception.");
                    }
                })
                .then(jsonMovieGenres => {
                    const genres = jsonMovieGenres.genres;
                    console.log(genres);
                    genres.forEach(genre => {
                        let movieIndexes = filterMoviesByGenre(genre.id, movies);
                        if (movieIndexes.length > 0) {
                            let genreSectionElement = createGenreSection(genre.name);
                            insertMovies(movieIndexes, movies, genreSectionElement);
                        }
                    });

                })
        })
}




searchMovies();



