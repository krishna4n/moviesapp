import {Component} from 'react'
import Cookie from 'js-cookie'
import './index.css'
import Header from '../Header'
import Footer from '../Footer'

class Account extends Component {
  onLogout = () => {
    const {history} = this.props
    Cookie.remove('jwt_token')
    Cookie.remove('user_details')
    history.replace('/login')
  }

  render() {
    const userDetails = JSON.parse(Cookie.get('user_details'))
    const {username, password} = userDetails
    const maskedPswd = '*'.repeat(password.length)
    return (
      <div className="account-container">
        <Header />
        <div className="user-details-container">
          <h1>Account</h1>
          <hr />
          <div className="membership-details">
            <p className="label">Member ship</p>
            <div>
              <p>{username}@gmail.com</p>
              <p>Password : {maskedPswd}</p>
            </div>
          </div>
          <hr />
          <div className="plan-details">
            <p className="label">Plan details</p>
            <div>
              <p>Premium</p> <p>Ultra HD</p>
            </div>
          </div>
          <div className="logout-container">
            <button
              type="button"
              onClick={this.onLogout}
              className="logout-button"
            >
              Logout
            </button>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

export default Account
