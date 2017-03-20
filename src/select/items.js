import { first, flow, join, mapValues, pick, property, split, toUpper } from 'lodash/fp'
import { setField, setWith } from 'cape-lodash'
import { createSelector } from 'reselect'
import { entityTypeSelector } from 'redux-graph'
import { OT_ITEM } from '../config'

export const orderTrackItems = entityTypeSelector(OT_ITEM)
export const setColor = setWith('color', 'colors', join('/'))
const CDN = 'https://delanyandlong.imgix.net'
export function getImgUrl(id) {
  return `${CDN}/${id.replace('|', '-')}.jpg?w=200`
}

export const setImage = setField('image', ({ hasImage, id }) => (hasImage && getImgUrl(id)) || null)
export const fixItem = flow(
  setColor,
  setImage,
  pick(['category', 'color', 'hasImage', 'id', 'image', 'name'])
)
export const fixItems = mapValues(fixItem)
export const selectItems = createSelector(orderTrackItems, fixItems)
export const getIdFromFile = flow(property('name'), split('.'), first, toUpper)
