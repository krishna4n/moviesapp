import {withRouter, Link} from 'react-router-dom'
import {HiOutlineSearch} from 'react-icons/hi'
import './index.css'

const Header = () => (
  <div className="nav-container">
    <div className="nav-menu-container">
      <img
        src="https://res.cloudinary.com/dk5lwv6ev/image/upload/v1671804122/MoviesApp/Group_7399_1x_ghsptq.png"
        alt="website logo"
        className="website-logo"
      />

      <Link to="/">
        <div className="nav-link">Home</div>
      </Link>

      <Link to="/popular">
        <div className="nav-link">Popular</div>
      </Link>
    </div>
    <div className="nav-profile-container">
      <HiOutlineSearch className="search-icon" />
      <img
        src="https://res.cloudinary.com/dk5lwv6ev/image/upload/v1671890636/MoviesApp/Avatar_meczii.png"
        alt="profile"
      />
    </div>
  </div>
)

export default withRouter(Header)
