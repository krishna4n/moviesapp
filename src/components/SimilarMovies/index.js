import './index.css'

const SimilarMovies = props => {
  const {similarMovie} = props
  console.log(similarMovie)

  return (
    <li className="similar-item-container">
      <img
        src={similarMovie.posterPath}
        alt={similarMovie.title}
        className="similar-movie-image"
      />
    </li>
  )
}

export default SimilarMovies
