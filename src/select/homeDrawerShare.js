import { entitySelector, fullEntitySelector } from 'redux-graph'
import { SETTING } from '../config'

export const activeDrawerEntity = { type: SETTING, id: 'activeDrawer' }
export const selectActiveDrawerEntity = fullEntitySelector(entitySelector(activeDrawerEntity))
