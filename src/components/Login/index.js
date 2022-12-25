import {Component} from 'react'
import Cookie from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', isLoginFailed: false, errMsg: ''}

  componentDidMount() {
    const jwtToken = Cookie.get('jwt_token')
    const {history} = this.props
    if (jwtToken !== undefined) {
      history.replace('/')
    }
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onLoginSubmit = async event => {
    event.preventDefault()
    const {history} = this.props
    const {username, password} = this.state
    const userDetails = {username, password}
    const loginApiUrl = `https://apis.ccbp.in/login`
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(loginApiUrl, options)
    const data = await response.json()
    console.log(data)
    if (response.ok) {
      const jwtToken = data.jwt_token
      Cookie.set('jwt_token', jwtToken)
      history.replace('/')
    } else {
      this.setState({
        isLoginFailed: true,
        errMsg: data.error_msg,
      })
    }
  }

  render() {
    const {username, password, isLoginFailed, errMsg} = this.state
    return (
      <div className="login-container">
        <div className="login-logo-container">
          <img
            src="https://res.cloudinary.com/dk5lwv6ev/image/upload/v1671804122/MoviesApp/Group_7399_2x_lb22on.png"
            alt="login website logo"
            className="login-logo"
          />
        </div>
        <div className="login-card-container">
          <form className="login-form-container" onSubmit={this.onLoginSubmit}>
            <h3 className="login-card-header">Login</h3>
            <label htmlFor="username" className="username-label">
              USERNAME
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="username"
              value={username}
              onChange={this.onChangeUsername}
            />
            <label htmlFor="password" className="password-label">
              PASSWORD
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="password"
              value={password}
              onChange={this.onChangePassword}
            />
            {isLoginFailed && <p className="login-error">{errMsg}</p>}
            <button type="submit" className="login-submit-button">
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default Login
