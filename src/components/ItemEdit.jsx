import React, { PropTypes } from 'react'
import Link from 'redux-history-component'

// import Icon from './Icon'

function ItemEdit({ dateModified, id, title }) {
  return (
    <li key={id}>
      <Link href={`/home-drawer/${id}`} className="brown bg-gray-hover white-hover">
        {/* <Icon symbol="documents" /> */}
        <span className="">{title || 'View'}</span>
        <span>{dateModified}</span>
      </Link>
    </li>
  )
}
ItemEdit.propTypes = {
  dateModified: PropTypes.number,
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
}
export default ItemEdit
