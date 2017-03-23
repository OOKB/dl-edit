import React, { PropTypes } from 'react'
import Link from 'redux-history-component'

import Icon from './Icon'

function ItemEdit({ id, title }) {
  return (
    <li key={id}>
      <Link href={`/home-drawer/${id}`} className="absolute right-0 view">
        <Icon symbol="documents" />
        <span className="mono fs0p6 uppercase ml0p25">{title || 'View'}</span>
      </Link>
    </li>
  )
}
ItemEdit.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
}
export default ItemEdit
