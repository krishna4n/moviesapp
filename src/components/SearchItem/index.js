import {Link} from 'react-router-dom'
import './index.css'

const SearchItem = props => {
  const {item} = props
  console.log(item)
  return (
    <li>
      <Link to={`/movies/${item.id}`}>
        <img
          src={item.posterPath}
          alt={item.title}
          className="search-item-image"
        />
      </Link>
    </li>
  )
}

export default SearchItem
