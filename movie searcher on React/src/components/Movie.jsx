import '../styles/App.css';
// import notFound from '/image-not-available.jpg' // relative path to image 

/**
 * Movie component
 * @param {Function} props.handleLikeMovie - handler to perform pressing 'like' button
 * @param {Array} props.likes - array of movies (id) that was marked as 'like'
 * @param {Array} props.model - movie model
 */
const Movie = ({ handleLikeMovie, likes, model }) => {

  const basePosterURL = "https://image.tmdb.org/t/p/w500/";
  const notFoundPosterPath = '/image-not-available.jpg';
  const id = model.id;
  const poster = model.poster_path;
  const title = model.title;
  const plot = model.overview;
  const voteAverage = model.vote_average;

  /**
   * Method to return rating string
   */
  const getRating = () => {
    return voteAverage + '/10';
  }

  /**
   * Method to return 'like' string
   */
  const ifLiked = () => {
    return (likes.length === 0) ? "false" : "" + likes.includes(id);
  }

  /**
   * Method to return poster url
   */
  const getPoster = () => {
    return poster === null ? notFoundPosterPath : basePosterURL + poster;
  }

  return (
    <div className="movie">
      <img src={getPoster()} alt="Movie poster" />
      <div className="overlay">
        <div className="title">{title}</div>
        <div className="rating">{getRating()}</div>
        <div className="plot">{plot}</div>
        <div data-toggled={ifLiked()}
          className="listToggle"
          onClick={() => handleLikeMovie(id)}>
          <div>
            <i className="far fa-heart"></i>
            <i className="fas fa-heart"></i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Movie;