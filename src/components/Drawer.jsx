import React, { PropTypes } from 'react'
import marked from 'marked'
import css from 'cape-style'

export default function Drawer({ description, image, title }) {
  return (
    <section className="drawer bg-light-gold inset-shadow" style={css('p2 relative')}>

      <div className="maxw50rem" style={css('flex mb0 pb0 mlrauto textCenter')}>

        <div className="imageWrapper" style={css('w50 pb1')}>
          {image && image.url && <img src={`${image.url}?w=600`} alt={title} />}
        </div>

        <div style={css('w50 p2')}>
          {title && <h1 className="dark-gold" style={css('m0 mb2')}>{title}</h1>}
          <p dangerouslySetInnerHTML={{ __html: marked(description) }} />
        </div>

      </div>

    </section>
  )
}
Drawer.propTypes = {
  description: PropTypes.string.isRequired,
  title: PropTypes.string,
  image: PropTypes.shape({
    url: PropTypes.string,
  }),
}
Drawer.defaultProps = {
  description: 'Lorem ipsum dolor sit amet adis plicit?',
}
