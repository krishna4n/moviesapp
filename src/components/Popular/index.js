import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookie from 'js-cookie'
import Header from '../Header'
import Footer from '../Footer'
import PopularMovieItem from '../PopularMovieItem'
import './index.css'

class Popular extends Component {
  state = {isAppLoaded: 'LOADING', popular: []}

  appStats = {
    loading: 'LOADING',
    success: 'SUCCESS',
    failed: 'FAILED',
  }

  componentDidMount() {
    this.getApiData()
  }

  getApiData = async () => {
    const jwtToken = Cookie.get('jwt_token')

    const popularApiUrl = `https://apis.ccbp.in/movies-app/popular-movies`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(popularApiUrl, options)
    const data = await response.json()
    console.log(data)
    if (response.ok) {
      const popularList = data.results.map(each => ({
        backdropPath: each.backdrop_path,
        id: each.id,
        posterPath: each.poster_path,
        title: each.title,
      }))
      this.setState({
        isAppLoaded: this.appStats.success,
        popular: popularList,
      })
    } else {
      this.setState({isAppLoaded: this.appStats.failed})
    }
  }

  renderingLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  renderingFailedView = () => (
    <div className="failed-view-container">
      <img
        src="https://res.cloudinary.com/dk5lwv6ev/image/upload/v1672047384/MoviesApp/Pathalertimage_qtub0k.png"
        alt="alert"
      />
      <p>Something went wrong. Please try agin</p>
      <button
        type="button"
        className="failed-view-button"
        onClick={this.getApiData}
      >
        Try Again
      </button>
    </div>
  )

  renderingPopularListView = () => {
    const {popular} = this.state

    return (
      <ul className="popular-list-container">
        {popular.map(each => (
          <PopularMovieItem movie={each} key={each.id} />
        ))}
      </ul>
    )
  }

  renderingOptions = () => {
    const {isAppLoaded} = this.state

    switch (isAppLoaded) {
      case this.appStats.loading:
        return this.renderingLoadingView()
      case this.appStats.success:
        return this.renderingPopularListView()
      case this.appStats.failed:
        return this.renderingFailedView()
      default:
        return ''
    }
  }

  render() {
    return (
      <div className="popular-container">
        <Header />

        {this.renderingOptions()}
        <Footer />
      </div>
    )
  }
}

export default Popular
