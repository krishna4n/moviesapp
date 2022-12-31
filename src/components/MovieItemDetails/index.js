import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookie from 'js-cookie'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'
import SimilarMovies from '../SimilarMovies'

class MovieItemDetails extends Component {
  state = {isAppLoaded: 'LOADING', movieDetails: undefined}

  appStatus = {
    loading: 'LOADING',
    success: 'SUCCESS',
    failed: 'FAILED',
  }

  componentDidMount() {
    this.getApiData()
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
    const jwtToken = Cookie.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params

    const apiUrl = `https://apis.ccbp.in/movies-app/movies/${id}`
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()

      const movieInfo = {
        adult: data.movie_details.adult,
        backdropPath: data.movie_details.backdrop_path,
        budget: data.movie_details.budget,
        id: data.movie_details.id,
        genres: data.movie_details.genres,
        overview: data.movie_details.overview,
        posterPath: data.movie_details.poster_path,
        releaseDate: data.movie_details.release_date,
        runtime: data.movie_details.runtime,
        similarMovies: data.movie_details.similar_movies,
        spokenLanguages: data.movie_details.spoken_languages,
        title: data.movie_details.title,
        voteAverage: data.movie_details.vote_average,
        voteCount: data.movie_details.vote_count,
      }

      this.setState({
        isAppLoaded: this.appStatus.success,
        movieDetails: movieInfo,
      })
    } else {
      this.setState({
        isAppLoaded: this.appStatus.failed,
      })
    }
  }

  renderingMovieDetailsView = () => {
    const {movieDetails} = this.state
    const date = new Date(movieDetails.releaseDate)
    const releasedOn = date.getFullYear()
    const hours = Math.floor(movieDetails.runtime / 60)
    const minutes = movieDetails.runtime % 60
    const childRating = movieDetails.adult ? 'A' : 'U/A'
    const similarMoviesList = movieDetails.similarMovies.map(each => ({
      backdropPath: each.backdrop_path,
      id: each.id,
      overview: each.overview,
      posterPath: each.poster_path,
      title: each.title,
    }))

    const languages = movieDetails.spokenLanguages.map(each => ({
      id: each.id,
      spokenLanguage: each.english_name,
    }))

    console.log(hours, minutes)
    return (
      <div className="movie-details">
        <div className="movie-details-container">
          <h1 className="movie-title">{movieDetails.title}</h1>
          <div className="movie-details-row-container">
            <p>{`${hours}h ${minutes}m`}</p>
            <p className="ua-container">{childRating}</p>
            <p>{releasedOn}</p>
          </div>
          <p className="movie-description">{movieDetails.overview}</p>
          <button type="button" className="movie-details-button">
            Play
          </button>
        </div>
        <ul className="details-container">
          <li className="genres-container">
            <ul className="genres-list">
              <h4 className="sub-heading">Genres</h4>
              {movieDetails.genres.map(each => (
                <li key={each.id}>
                  <p className="list-text">{each.name}</p>
                </li>
              ))}
            </ul>
          </li>
          <li className="audio-available-container">
            <ul className="audio-available-list">
              <h4 className="sub-heading">Audio Available</h4>
              {languages.map(each => (
                <li key={each.id}>
                  <p className="list-text">{each.spokenLanguage}</p>
                </li>
              ))}
            </ul>
          </li>
          <li className="rating-container">
            <h4 className="sub-heading">Rating Count</h4>
            <p className="list-text">{movieDetails.voteAverage}</p>
            <h4 className="sub-heading">Rating Average</h4>
            <p className="list-text">{movieDetails.voteCount}</p>
          </li>
          <li className="budget-container">
            <h4 className="sub-heading">Budget</h4>
            <p className="list-text">{movieDetails.budget}</p>
            <h4 className="sub-heading">Release Date</h4>
            <p className="list-text">{movieDetails.releaseDate}</p>
          </li>
        </ul>
        <div className="more-like-this">
          <h2 className="more-like-this-heading">More like this</h2>
          <ul className="more-like-this-container">
            {similarMoviesList.map(each => (
              <SimilarMovies key={each.id} similarMovie={each} />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  renderingOptions = () => {
    const {isAppLoaded} = this.state
    switch (isAppLoaded) {
      case this.appStatus.loading:
        return this.renderingLoadingView()
      case this.appStatus.success:
        return this.renderingMovieDetailsView()
      case this.appStatus.failed:
        return this.renderingFailedView()
      default:
        return ''
    }
  }

  render() {
    const {movieDetails} = this.state
    const posterStyle =
      movieDetails !== undefined ? movieDetails.posterPath : ''
    console.log(posterStyle)
    return (
      <div className="movie-item-details-container">
        <div
          style={{
            backgroundImage: `url(${posterStyle})`,
            height: '100%',

            width: '100%',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
          }}
          className="movie-poster-container"
        >
          <Header />
          {this.renderingOptions()}
          <div className="footer">
            <Footer />
          </div>
        </div>
      </div>
    )
  }
}

export default MovieItemDetails
