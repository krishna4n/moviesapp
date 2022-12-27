import {Component} from 'react'
import Cookie from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Footer from '../Footer'
import HomePosterDetails from '../HomePosterDetails'
import './index.css'
import Trending from '../Trending'
import Originals from '../Originals'

class Home extends Component {
  state = {
    originals: [],
    trending: [],
    hasOriginalsList: 'LOADING',
    hasTendingList: 'LOADING',
    hasPosterDetails: 'LOADING',
    randomPosterDetails: [],
  }

  apiStatus = {
    loading: 'LOADING',
    success: 'SUCCESS',
    failed: 'FAILED',
  }

  componentDidMount() {
    this.getApiData()
  }

  getRandomPoster = () => {
    const {originals} = this.state
    console.log(originals.length)
    const randomId = Math.floor(Math.random() * originals.length)
    this.setState({
      randomPosterDetails: originals[randomId],
      hasPosterDetails: this.apiStatus.success,
    })
  }

  getApiData = async () => {
    const jwtToken = Cookie.get('jwt_token')
    const trendingApiUrl = 'https://apis.ccbp.in/movies-app/trending-movies'
    const originalsApiUrl = 'https://apis.ccbp.in/movies-app/originals'
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }
    const trendingResponse = await fetch(trendingApiUrl, options)

    if (trendingResponse.ok) {
      const trendingData = await trendingResponse.json()
      const trendingList = trendingData.results.map(each => ({
        id: each.id,
        backDropPath: each.backdrop_path,
        overview: each.overview,
        posterPath: each.poster_path,
        title: each.title,
      }))
      this.setState({
        trending: trendingList,
        hasTendingList: this.apiStatus.success,
      })
    } else {
      this.setState({
        hasTendingList: this.apiStatus.failed,
      })
    }

    const originalsResponse = await fetch(originalsApiUrl, options)

    if (originalsResponse.ok) {
      const originalsData = await originalsResponse.json()
      const originalsList = originalsData.results.map(each => ({
        id: each.id,
        backDropPath: each.backdrop_path,
        overview: each.overview,
        posterPath: each.poster_path,
        title: each.title,
      }))

      this.setState({
        originals: originalsList,
        hasOriginalsList: this.apiStatus.success,
      })

      this.getRandomPoster()
    } else {
      this.setState({
        hasPosterDetails: this.apiStatus.failed,
        hasOriginalsList: this.apiStatus.failed,
      })
    }
  }

  renderingLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  renderingHomePosterDetailsView = () => {
    const {randomPosterDetails} = this.state
    return <HomePosterDetails posterDetails={randomPosterDetails} />
  }

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

  renderingHomePosterDetailsOptions = () => {
    const {hasPosterDetails} = this.state
    switch (hasPosterDetails) {
      case this.apiStatus.loading:
        return this.renderingLoadingView()
      case this.apiStatus.success:
        return this.renderingHomePosterDetailsView()
      case this.apiStatus.failed:
        return this.renderingFailedView()
      default:
        return ''
    }
  }

  renderingTrendingNowView = () => {
    const {trending} = this.state
    console.log('inside trending method called', trending)
    return <Trending trending={trending} />
  }

  renderingOriginalsView = () => {
    const {originals} = this.state
    console.log('inside originals method called', originals)
    return <Originals originals={originals} />
  }

  renderingTrendingNowOptions = () => {
    const {hasPosterDetails} = this.state
    switch (hasPosterDetails) {
      case this.apiStatus.loading:
        return this.renderingLoadingView()
      case this.apiStatus.success:
        return this.renderingTrendingNowView()
      case this.apiStatus.failed:
        return this.renderingFailedView()
      default:
        return ''
    }
  }

  renderingOriginalsOptions = () => {
    const {hasPosterDetails} = this.state
    switch (hasPosterDetails) {
      case this.apiStatus.loading:
        return this.renderingLoadingView()
      case this.apiStatus.success:
        return this.renderingOriginalsView()
      case this.apiStatus.failed:
        return this.renderingFailedView()
      default:
        return ''
    }
  }

  render() {
    const {
      hasOriginalsList,
      hasPosterDetails,
      hasTendingList,
      randomPosterDetails,
    } = this.state
    console.log(hasOriginalsList, hasPosterDetails, hasTendingList)
    console.log(randomPosterDetails)
    const posterStyle =
      randomPosterDetails !== undefined ? randomPosterDetails.backDropPath : ''
    console.log(posterStyle)
    return (
      <div className="home-container">
        <div
          style={{
            backgroundImage: `url(${posterStyle})`,

            width: '100%',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
          }}
          className="home-poster-container"
        >
          <Header />
          {this.renderingHomePosterDetailsOptions()}
        </div>
        <div className="trending-now-container">
          {this.renderingTrendingNowOptions()}
        </div>
        <div className="originals-container">
          {this.renderingOriginalsOptions()}
        </div>

        <Footer />
      </div>
    )
  }
}

export default Home
