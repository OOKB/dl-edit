import React, { PropTypes } from 'react'
import Link from 'redux-history-component'
import moment from 'moment'
// import Icon from './Icon'

function ItemEdit({ dateModified, onCheckbox, id, isActive, title }) {
  return (
    <li key={id}>
      <Link href={`/home-drawer/${id}`} className="brown bg-gray-hover white-hover">
        {/* <Icon symbol="documents" /> */}
        <span className="">{title || 'View'}</span>
        <span>{moment(dateModified).format('M/D/YY')}</span>
      </Link>
      <input name="isActive" type="checkbox" checked={isActive} onChange={onCheckbox} />
    </li>
  )
}
ItemEdit.propTypes = {
  dateModified: PropTypes.number,
  id: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  onCheckbox: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
}
export default ItemEdit
