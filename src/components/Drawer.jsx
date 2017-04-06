import React, { PropTypes } from 'react'
import css from '../style'

export default function Drawer({ image, title, blurb }) {
  return (
    <section className="drawer bg-light-gold inset-shadow" style={css('p2 relative')}>

      <div className="maxw50rem" style={css('flex mb0 pb0 mlrauto textCenter')}>

        <div className="imageWrapper" style={css('w50 pb1')}>
          {image && image.url && <img src={`${image.url}?w=600`} alt={title} />}
        </div>

        <div style={css('w50 p2')}>
          {title && <h1 className="dark-gold" style={css('m0 mb2')}>{title}</h1>}
          <p>{blurb}</p>
        </div>

      </div>

    </section>
  )
}
Drawer.propTypes = {
  title: PropTypes.string,
  image: PropTypes.shape({
    url: PropTypes.string,
  }),
  blurb: PropTypes.string,
}
Drawer.defaultProps = {
  blurb: 'Lorem ipsum dolor sit amet adis plicit?'
}
