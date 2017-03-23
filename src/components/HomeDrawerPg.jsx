import React, { PropTypes } from 'react'
import { map } from 'lodash'
import css from '../style'
import Page from './Page'
import Icon from './Icon'
import ItemEdit from './ItemEdit'
// import Field from './Editable/FieldWrapper'

function HomeDrawerPg({ createItem, fieldInfo, items }) {
  return (
    <Page>
      <h1 style={css('m0 mb0p5 fs2')}>Edit home drawer</h1>
      <ul className="drawers collections" style={css('lsNone m0 p0')}>
        {map(items, ItemEdit)}
        <li className="gray">
          <Icon symbol="plus" className="pointer fs1 gray" />
          <button className="gray" onClick={createItem}>{fieldInfo.emptyText}</button>
        </li>
      </ul>
    </Page>
  )
}
HomeDrawerPg.defaultProps = {
  fieldInfo: {
    emptyText: 'Add Drawer',
    icon: { className: 'light-gray', symbol: 'pencil' },
    id: 'new-drawer',
    placeholder: 'Title',
    prefix: ['HomeDrawer', 'title'],
    // validate
  },
}
HomeDrawerPg.propTypes = {
  createItem: PropTypes.func.isRequired,
  fieldInfo: PropTypes.shape({
    emptyText: PropTypes.string,
  }),
  items: PropTypes.objectOf(PropTypes.object),
}
export default HomeDrawerPg
