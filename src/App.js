import {Route, Switch, Redirect} from 'react-router-dom'
import {Component} from 'react'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './components/Login'
import Home from './components/Home'
import './App.css'
import Popular from './components/Popular'
import MovieItemDetails from './components/MovieItemDetails'
import Search from './components/Search'
import SearchContext from './components/Context/SearchContext'
import NotFound from './components/NotFound'
import Account from './components/Account'

class App extends Component {
  state = {searchInput: ''}

  changeInput = val => {
    this.setState({
      searchInput: val,
    })
  }

  render() {
    const {searchInput} = this.state
    return (
      <SearchContext.Provider
        value={{
          searchInput,
          changeInput: this.changeInput,
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
      </SearchContext.Provider>
    )
  }
}

export default App
