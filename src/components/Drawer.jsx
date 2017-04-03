import React, { PropTypes } from 'react'

export default function Drawer({ image, title }) {
  return (
    <div style={{ border: 'solid' }}>
      {title && <h2>{title}</h2>}
      {image && image.url && <img src={`${image.url}?w=200`} alt={title} />}
    </div>
  )
}
Drawer.propTypes = {
  title: PropTypes.string,
  image: PropTypes.shape({
    url: PropTypes.string,
  }),
}
