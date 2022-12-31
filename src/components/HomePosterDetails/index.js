import './index.css'

const HomePosterDetails = props => {
  const {posterDetails} = props
  const {overview, title} = posterDetails
  console.log(posterDetails)
  return (
    <div className="home-poster-details-container">
      <h1 className="home-poster-title">{title}</h1>
      <p className="home-poster-overview">{overview}</p>
      <div>
        <button type="button" className="home-poster-button">
          Play
        </button>
      </div>
    </div>
  )
}

export default HomePosterDetails
