import React, { PropType } from 'react'

export default function Drawer({ image, title }) {
  return (
    <div>
      {title && <h2>{title}</h2>}
      {image && <img src={image} alt={title} />}
    </div>
  )
}
Drawer.propTypes = {
  title: PropType.string,
  image: PropType.string,
}
