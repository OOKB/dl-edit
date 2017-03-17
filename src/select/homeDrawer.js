// import { partial } from 'lodash'
import { entityTypeSelector } from 'redux-graph'
import { getSelect, structuredSelector } from 'cape-select'
import { saveEntity } from 'cape-firebase'
import { createHistory } from 'redux-history-sync'
// import { open } from 'redux-field'
import { HOME_DRAWER } from '../config'
import { routeParam } from '../redux/routing'

export const drawerEntity = entityTypeSelector(HOME_DRAWER)

export const title = {
  id: 'title',
  description: 'Title as you would like it displayed',
  position: 0,
  isRequired: true,
  name: 'Display Name',
  type: 'text',
  validators: ['isRequired'],
}
export const drawerFields = {
  title,
}
export const drawerSelector = structuredSelector({
  items: drawerEntity,
})
export function createItem() {
  return (dispatch) => {
    // Create a new entity in firebase.
    dispatch(saveEntity({ type: HOME_DRAWER }))
    // Tell redux to open the new entity.
    .then(({ id }) => dispatch(createHistory(`/project/${id}`)))
  }
}
const getEntityId = routeParam('id')
const selectEntity = getSelect(drawerEntity, getEntityId)

export const drawerEdit = structuredSelector({
  entity: selectEntity,
  fields: drawerFields,
  title: 'Drawer Editor',
  prefix: HOME_DRAWER,
  id: getEntityId,
})
export const drawerActions = {
  createItem,
}
