import Movie from "./Movie";
import '../styles/App.css';

/**
 * Movies container component
 * @param {Function} props.handleLikeMovie - handler to perform pressing 'like' button
 * @param {Array} props.likes - array of movies (id) that was marked as 'like'
 * @param {Array} props.movies - array of movies models
 */
const MovieContainer = ({ handleLikeMovie, likes, movies }) => {
  return (
    <div className="titleList">
      <div className="title">
        <h1>Movies</h1>
        <div className="titles-wrapper">
          {movies.map((movie) => {
            return <Movie key={movie.id}
              handleLikeMovie={handleLikeMovie}
              likes={likes}
              model={movie} />
          })}
        </div>
      </div>
    </div>
  );
}

export default MovieContainer;