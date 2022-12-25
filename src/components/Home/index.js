import {Component} from 'react'
import Cookie from 'js-cookie'
import Header from '../Header'
import Footer from '../Footer'
import HomePosterDetails from '../HomePosterDetails'
import './index.css'

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
    const randomId = Math.floor(Math.random() * originals.length + 1)
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
    const originalsResponse = await fetch(originalsApiUrl, options)
    const trendingData = await trendingResponse.json()

    if (trendingResponse.ok) {
      const trendingList = trendingData.results.map(each => ({
        id: each.id,
        backDropPath: each.backdrop_path,
        overview: each.overview,
        posterPath: each.poster_path,
        title: each.title,
      }))
      console.log(trendingList)
      this.setState({
        trending: trendingList,
        hasTendingList: this.apiStatus.success,
      })
    } else {
      this.setState({
        hasTendingList: this.apiStatus.failed,
      })
    }
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
            background: `url(${posterStyle})`,
            backgroundRepeat: 'no-repeat',
          }}
          className="home-poster-container"
        >
          <Header />
          <HomePosterDetails />
        </div>

        <Footer />
      </div>
    )
  }
}

export default Home
