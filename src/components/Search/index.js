import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookie from 'js-cookie'
import Header from '../Header'
import SearchItem from '../SearchItem'
import './index.css'
import Footer from '../Footer'

class Search extends Component {
  state = {isLoaded: 'LOADING', searchList: [], searchInput: ''}

  appStatus = {
    loading: 'LOADING',
    success: 'SUCCESS',
    failed: 'FAILED',
    noVideos: 'NOVIDEOS',
  }

  componentDidMount() {
    this.getApiData()
  }

  renderingLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  renderingSearchedDataView = () => {
    const {searchList} = this.state
    return (
      <ul className="search-item-container">
        {searchList.map(each => (
          <SearchItem item={each} key={each.id} />
        ))}
      </ul>
    )
  }

  renderingFailedView = () => (
    <div className="failed-view-container">
      <img
        src="https://res.cloudinary.com/dk5lwv6ev/image/upload/v1672047384/MoviesApp/Pathalertimage_qtub0k.png"
        alt="failure view"
      />
      <p>Something went wrong. Please try again</p>
      <button
        type="button"
        className="failed-view-button"
        onClick={this.getApiData}
      >
        Try Again
      </button>
    </div>
  )

  getApiData = async () => {
    console.log('getapidata')
    const {searchInput} = this.state
    const jwtToken = Cookie.get('jwt_token')
    const getApiUrl = `https://apis.ccbp.in/movies-app/movies-search?search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {Authorization: `Authorization ${jwtToken}`},
    }
    const response = await fetch(getApiUrl, options)
    const data = await response.json()
    const newList = data.results.map(each => ({
      id: each.id,
      backdropPath: each.backdrop_path,
      posterPath: each.poster_path,
      title: each.title,
    }))

    if (response.ok) {
      if (data.results.length > 0) {
        this.setState({
          isLoaded: this.appStatus.success,
          searchList: newList,
        })
      } else {
        this.setState({
          isLoaded: this.appStatus.noVideos,
        })
      }
    } else {
      this.setState({
        isLoaded: this.appStatus.failed,
      })
    }
  }

  renderingNoVideosView = () => {
    const {searchInput} = this.state

    return (
      <div className="no-video-container">
        <img
          src="https://res.cloudinary.com/dk5lwv6ev/image/upload/v1672384117/MoviesApp/Group_7394_2x_acyucy.png"
          alt="no movies"
          className="no-movie-image"
        />
        <p>Your search for {searchInput} did not find any matches.</p>
      </div>
    )
  }

  renderingOptions = () => {
    const {isLoaded} = this.state

    switch (isLoaded) {
      case this.appStatus.loading:
        return this.renderingLoadingView()
      case this.appStatus.success:
        return this.renderingSearchedDataView()
      case this.appStatus.failed:
        return this.renderingFailedView()
      case this.appStatus.noVideos:
        return this.renderingNoVideosView()
      default:
        return ''
    }
  }

  changeInput = val => {
    this.setState({
      searchInput: val,
    })
  }

  clickedSearchButton = () => {
    this.getApiData()
  }

  render() {
    return (
      <div className="search-container">
        <Header
          changeInput={this.changeInput}
          clickedSearchButton={this.clickedSearchButton}
          searchClicked="true"
        />
        {this.renderingOptions()}
        <Footer />
      </div>
    )
  }
}

export default Search
