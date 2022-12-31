import {Route, Switch, Redirect} from 'react-router-dom'
import {Component} from 'react'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './components/Login'
import Home from './components/Home'
import './App.css'
import Popular from './components/Popular'
import MovieItemDetails from './components/MovieItemDetails'
import Search from './components/Search'
import NotFound from './components/NotFound'
import Account from './components/Account'
import LoginContext from './components/Context/LoginContext'

class App extends Component {
  state = {userName: '', passWord: ''}

  updateCredentials = (user, pass) => {
    this.setState({
      userName: user,
      passWord: pass,
    })
  }

  render() {
    const {userName, passWord} = this.state
    return (
      <LoginContext.Provider
        value={{
          userName,
          passWord,
          updateCredentials: this.updateCredentials,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/popular" component={Popular} />
          <ProtectedRoute
            exact
            path="/movies/:id"
            component={MovieItemDetails}
          />
          <ProtectedRoute exact path="/search" component={Search} />
          <ProtectedRoute exact path="/account" component={Account} />

          <Route path="/bad-path" component={NotFound} />
          <Redirect to="/bad-path" />
        </Switch>
      </LoginContext.Provider>
    )
  }
}

export default App
