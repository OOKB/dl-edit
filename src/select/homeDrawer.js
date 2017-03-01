// import { property } from 'lodash'
import { entityTypeSelector } from 'redux-graph'
import { structuredSelector } from 'cape-select'
import { HOME_DRAWER } from '../config'

export const drawerEntity = entityTypeSelector(HOME_DRAWER)
export const drawerSelector = structuredSelector({
  items: drawerEntity,
})
