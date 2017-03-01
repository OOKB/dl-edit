import React, { PropTypes } from 'react'
import Link from 'redux-history-component'

import Icon from './Icon'

function ItemEdit({ id, itemListId, onClick, title }) {
  return (
    <li key={id}>
      {!itemListId && <Icon symbol="circle-o" className="fa-li light-gray pointer" />}
      {itemListId && <Icon symbol="dot-circle-o" className="fa-li green pointer" />}
      <button className="plain pointer relative gold text-left" onClick={onClick}>{title}</button>
      <Link href={`/project/${id}`} className="absolute right-0 view">
        <Icon symbol="documents" />
        <span className="mono fs0p6 uppercase ml0p25 lightgray">view</span>
      </Link>
    </li>
  )
}
ItemEdit.propTypes = {
  id: PropTypes.string.isRequired,
  itemListId: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
}
export default ItemEdit
