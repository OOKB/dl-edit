import { first, flow, join, mapValues, pick, property, split, toUpper } from 'lodash/fp'
import { setWith } from 'cape-lodash'
import { createSelector } from 'reselect'
import { getSelect } from 'cape-select'
import { entityTypeSelector } from 'redux-graph'
import { OT_ITEM } from '../config'

export const orderTrackItems = entityTypeSelector(OT_ITEM)
export const setColor = setWith('color', 'colors', join('/'))
export const fixItem = flow(
  setColor,
  pick(['color', 'hasImage', 'id', 'name'])
)
export const fixItems = mapValues(fixItem)
export const selectItems = createSelector(orderTrackItems, fixItems)
export const getIdFromFile = flow(property('name'), split('.'), first, toUpper)
export const findItemFromFile = getSelect(
  selectItems,
  getIdFromFile,
)
