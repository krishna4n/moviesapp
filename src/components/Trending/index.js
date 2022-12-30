import {Link} from 'react-router-dom'
import Slider from 'react-slick'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import './index.css'

const Trending = props => {
  const {trending} = props
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 4,
  }
  console.log(trending)
  return (
    <>
      <h1 className="trending-header">Trending Now</h1>
      <div className="slider-container">
        <Slider {...settings}>
          {trending.map(each => (
            <div className="slider-item-container">
              <Link to={`/movies/${each.id}`}>
                <img
                  src={each.posterPath}
                  alt={each.title}
                  className="trending-image"
                />
              </Link>
            </div>
          ))}
        </Slider>
      </div>
    </>
  )
}

export default Trending
