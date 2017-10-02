import React from 'react'
import PropTypes from 'prop-types'
import css from 'cape-style'
import Link from 'redux-history-component'
import moment from 'moment'
// import Icon from './Icon'

function ItemEdit({ dateModified, onCheckbox, onDelete, id, isActive, title }) {
  return (
    <li key={id} className="brown bg-gray-hover white-hover">
      <label className="control checkbox">
        <input className="selectItem" name="isActive" type="checkbox" checked={isActive} onChange={onCheckbox} />
        <span className="control-indicator" />
      </label>
      <button className="delete bg-orange-hover" onClick={onDelete}>Delete</button>
      <Link routeId="drawerEdit" id={id} className="brown bg-gray-hover white-hover">
        {/* <Icon symbol="documents" /> */}
        <span className="date">{moment(dateModified).format('M/D/YY')}</span>
        <span className="title" style={css('pl1')}>{title}</span>
      </Link>
    </li>
  )
}
ItemEdit.propTypes = {
  dateModified: PropTypes.number,
  id: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  onCheckbox: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
}
ItemEdit.defaultProps = {
  title: 'View',
}
export default ItemEdit
