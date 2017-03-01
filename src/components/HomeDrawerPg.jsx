import React, { PropTypes } from 'react'
import { map } from 'lodash'
import Page from './Page'
import Icon from './Icon'
import ItemEdit from './ItemEdit'
import Field from './Editable/FieldWrapper'

function BasicEdit({ createItem, fieldInfo, items }) {
  return (
    <Page>
      <h1>Edit home drawer</h1>
      <ul className="list-reset collections fa-ul">
        {map(items, ItemEdit)}
        <li>
          <Icon symbol="plus" className="fa-li light-gray pointer fs1" />
          <Field {...fieldInfo} onSubmit={createItem} />
        </li>
      </ul>
    </Page>
  )
}
BasicEdit.defaultProps = {
  fieldInfo: {
    emptyText: 'Add Drawer',
    icon: { className: 'light-gray', symbol: 'pencil' },
    id: 'new-drawer',
    placeholder: 'Title',
    prefix: ['HomeDrawer', 'title'],
    // validate
  },
}
BasicEdit.propTypes = {
  createItem: PropTypes.func.isRequired,
  fieldInfo: PropTypes.shape({
    emptyText: PropTypes.string,
  }),
  items: PropTypes.objectOf(PropTypes.object),
}
export default BasicEdit
