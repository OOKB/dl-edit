import { entitySelector, entityTypeSelector, fullEntitySelector } from 'redux-graph'
import { getSelect, select } from 'cape-select'
import { HOME_DRAWER, SETTING } from '../config'

export const activeDrawerEntity = { type: SETTING, id: 'activeDrawer' }
export const drawerEntity = entityTypeSelector(HOME_DRAWER)
export const selectActiveDrawerEntity = fullEntitySelector(entitySelector(activeDrawerEntity))
export const selectActiveDrawerId = select(selectActiveDrawerEntity, 'mainEntity.id')
export const selectDrawerEntity = getSelect(drawerEntity, selectActiveDrawerId)
export const selectDrawerFull = fullEntitySelector(selectDrawerEntity)
