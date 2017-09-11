import React from 'react'
import PropTypes from 'prop-types'
import { map } from 'lodash'
import css from 'cape-style'
import Page from './Page'
import Icon from './Icon'
import ItemEdit from './ItemEdit'

function HomeDrawerPg({ activeDrawerId, createItem, entityDel, fieldInfo, items, selectDrawer }) {
  function itemProps(item) {
    return {
      ...item,
      isActive: activeDrawerId === item.id,
      key: item.id,
      onDelete: () => entityDel(item),
      onCheckbox: () => selectDrawer(item.id),
    }
  }
  return (
    <Page>
      <h1 style={css('bb m0 fs2 p1 pl2 pr2')}>Edit home drawer</h1>
      <ul className="drawers collections" style={css('lsNone m0 p0')}>
        <li className="gray lightgray-hover border-gray-hover">
          <Icon symbol="plus" className="pointer fs1" />
          <button className="gray lightgray-hover border-gray-hover" onClick={createItem}>
            {fieldInfo.emptyText}
          </button>
        </li>
        {map(items, item => <ItemEdit {...itemProps(item)} />)}
      </ul>
    </Page>
  )
}
HomeDrawerPg.defaultProps = {
  fieldInfo: {
    emptyText: 'Add Drawer',
    icon: { className: 'lightgray', symbol: 'pencil' },
    id: 'new-drawer',
    placeholder: 'Title',
    prefix: ['HomeDrawer', 'title'],
    // validate
  },
}
HomeDrawerPg.propTypes = {
  activeDrawerId: PropTypes.string,
  createItem: PropTypes.func.isRequired,
  entityDel: PropTypes.func.isRequired,
  fieldInfo: PropTypes.shape({
    emptyText: PropTypes.string,
  }),
  items: PropTypes.objectOf(PropTypes.object),
  selectDrawer: PropTypes.func.isRequired,
}
export default HomeDrawerPg
