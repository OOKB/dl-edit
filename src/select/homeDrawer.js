import { partial } from 'lodash'
import { entityTypeSelector } from 'redux-graph'
import { structuredSelector } from 'cape-select'
import { saveEntity } from 'cape-firebase'
import { HOME_DRAWER } from '../config'

export const drawerEntity = entityTypeSelector(HOME_DRAWER)
export const drawerSelector = structuredSelector({
  items: drawerEntity,
})
export const drawerActions = {
  createItem: partial(saveEntity, { type: HOME_DRAWER }),
}
