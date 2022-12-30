import {withRouter, Link} from 'react-router-dom'

import {HiOutlineSearch} from 'react-icons/hi'
import './index.css'

const Header = props => {
  const {changeInput, clickedSearchButton, searchClicked} = props

  const changeSearchInput = event => {
    changeInput(event.target.value)
  }

  const onSearchButton = () => {
    clickedSearchButton()
  }

  const searchIconContainer =
    searchClicked === undefined ? 'no-display' : 'search-icon-container'
  const searchIcon = searchClicked === undefined ? 'search-icon' : 'no-display'

  return (
    <nav className="nav-container">
      <ul className="nav-menu-container">
        <Link to="/">
          <img
            src="https://res.cloudinary.com/dk5lwv6ev/image/upload/v1671804122/MoviesApp/Group_7399_1x_ghsptq.png"
            alt="website logo"
            className="website-logo"
          />
        </Link>

        <li>
          <Link to="/">
            <p className="nav-link">Home</p>
          </Link>
        </li>

        <li>
          <Link to="/popular">
            <p className="nav-link">Popular</p>
          </Link>
        </li>
      </ul>

      <div className="nav-profile-container">
        <div className={searchIconContainer}>
          <input
            type="search"
            className="search-input"
            onKeyUp={changeSearchInput}
          />
          <button type="button" className="search-button" testid="searchButton">
            <HiOutlineSearch className="search-icon" onClick={onSearchButton} />
          </button>
        </div>
        <div className={searchIcon}>
          <Link to="/search">
            <HiOutlineSearch className="search-icon" />
          </Link>
        </div>
        <Link to="/account">
          <img
            src="https://res.cloudinary.com/dk5lwv6ev/image/upload/v1671890636/MoviesApp/Avatar_meczii.png"
            alt="profile"
            className="profile-icon"
          />
        </Link>
      </div>
    </nav>
  )
}

export default withRouter(Header)
