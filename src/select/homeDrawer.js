import { sortBy } from 'lodash'
import { entityTypeSelector, fullEntitySelector, tripleDel } from 'redux-graph'
import { getSelect, select, structuredSelector } from 'cape-select'
import { saveEntity, deleteEntity, deleteTriple, saveTriple } from 'cape-firebase'
import { createHistory } from 'redux-history-sync'

// import { open } from 'redux-field'
import { HOME_DRAWER } from '../config'
import { routeParam } from '../redux/routing'
import { ACCEPT_FILE_TYPE } from './image'
import { activeDrawerEntity, selectActiveDrawerEntity } from './homeDrawerShare'

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
export const image = {
  accept: ACCEPT_FILE_TYPE,
  collectionId: 'ImageObject',
  id: 'image',
  name: 'Image',
  position: 2,
  single: true,
  type: 'file',
}
export const description = {
  id: 'description',
  // description: '',
  position: 1,
  name: 'Description',
  type: 'textarea',
  validators: ['isRequired'],
}
export const drawerFields = {
  description,
  image,
  title,
}

export const selectActiveDrawerId = select(selectActiveDrawerEntity, 'mainEntity.id')

export const drawerSelector = structuredSelector({
  activeDrawerId: selectActiveDrawerId,
  items: drawerEntity,
})
export function createItem() {
  return (dispatch) => {
    // Create a new entity in firebase.
    dispatch(saveEntity({ type: HOME_DRAWER }))
    // Tell redux to open the new entity.
    .then(({ id }) => dispatch(createHistory(`/home-drawer/${id}`)))
  }
}
const getEntityId = routeParam('id')
const selectDrawerEntity = getSelect(drawerEntity, getEntityId)
const selectDrawerFull = fullEntitySelector(selectDrawerEntity)

const drawerTriple = { subject: activeDrawerEntity, predicate: 'mainEntity', single: true }
export function selectDrawer(id) {
  return (dispatch, getState) => {
    if (selectActiveDrawerId(getState()) === id) {
      dispatch(tripleDel(drawerTriple)) // HACK Because how delete Triple from firebase?
      return dispatch(deleteTriple(drawerTriple))
    }
    return dispatch(saveTriple({ ...drawerTriple, object: { id, type: HOME_DRAWER } }))
  }
}

export const drawerEdit = structuredSelector({
  entity: selectDrawerFull,
  fields: sortBy(drawerFields, 'position'),
  title: 'Drawer Editor',
  entityType: HOME_DRAWER,
  id: getEntityId,
})
export const drawerActions = {
  createItem,
  entityDel: deleteEntity,
  selectDrawer,
}
