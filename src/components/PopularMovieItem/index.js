import {Link} from 'react-router-dom'
import './index.css'

const PopularMovieItem = props => {
  const {movie} = props

  return (
    <li className="popular-item-container">
      <Link to={`/movies/${movie.id}`}>
        <img
          src={movie.backdropPath}
          alt={movie.title}
          className="popular-item-image"
        />
      </Link>
    </li>
  )
}

export default PopularMovieItem
