import React, { PropTypes } from 'react'
import { capitalize } from 'lodash'

function Item({ category, color, hasImage, id, image, name }) {
  return (
    <div>
      <h2>{id}<small>{capitalize(category)}</small></h2>
      <h3>{name}: {color}</h3>
      {hasImage && <button>Replace image</button>}
      <p>Found image</p>
      {image && <img src={image} alt={id} title={id} />}
    </div>
  )
}

Item.propTypes = {
  category: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  hasImage: PropTypes.bool,
  id: PropTypes.string.isRequired,
  image: PropTypes.string,
  name: PropTypes.string.isRequired,
}
Item.defaultProps = {
}
export default Item
