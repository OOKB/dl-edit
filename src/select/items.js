import { flow, join, map, pick } from 'lodash/fp'
import { setWith } from 'cape-lodash'
import { createSelector } from 'reselect'
import { entityTypeSelector } from 'redux-graph'
import { OT_ITEM } from '../config'

export const orderTrackItems = entityTypeSelector(OT_ITEM)
export const setColor = setWith('color', 'colors', join('/'))
export const fixItem = flow(
  setColor,
  pick(['color', 'hasImage', 'id', 'name'])
)
export const fixItems = map(fixItem)
export const selectItems = createSelector(orderTrackItems, fixItems)
