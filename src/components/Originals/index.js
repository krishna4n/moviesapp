import {Link} from 'react-router-dom'
import Slider from 'react-slick'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import './index.css'

const Originals = props => {
  const {originals} = props
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 4,
  }
  return (
    <>
      <h1 className="originals-header">Originals</h1>
      <div className="slider-container">
        <Slider {...settings}>
          {originals.map(each => (
            <div className="slider-item-container">
              <Link to={`/movies/${each.id}`}>
                <img
                  src={each.posterPath}
                  alt={each.title}
                  className="originals-image"
                />
              </Link>
            </div>
          ))}
        </Slider>
      </div>
    </>
  )
}

export default Originals
