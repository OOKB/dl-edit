import { flow, partial, property } from 'lodash'
import { add, eq, map, orderBy, pick, size, split } from 'lodash/fp'
import { callWith, replaceField } from 'cape-lodash'
import {
  clear, clearError, error, fieldValue, meta, onBlur, saved, saveProgress,
} from 'redux-field'
import { entityTypeSelector } from 'redux-graph'
import { createSelector } from 'reselect'
import { structuredSelector } from 'cape-select'
import { selectUser } from 'cape-redux-auth'

import { CDN_URL } from '../config'
import { omitFile } from '../components/FileUpload/dropZoneUtils'
import { loadImage, loadImageUrl, loadSha } from '../components/FileUpload/processFile'
import * as firebase from '../fire'
import { entitySet, entityUpdate } from '../fire/util'
import { findItemFromFile } from './items'

const { storage } = firebase

export const ACCEPT_FILE_TYPE = 'image/jpeg'
export const collectionId = 'file'
export const debugReturn = (item) => { console.log(item); return item }
export const onProgress = dispatch => flow(
  pick(['bytesTransferred', 'totalBytes']), partial(saveProgress, collectionId), dispatch
)

export function getImgSrc(url) {
  return `${url}?crop=entropy&fit=crop&h=100&w=100`
}
export const clearFileSelect = callWith(clear(collectionId))
export const onComplete = (dispatch, { id, fileName, type }) => () => {
  const url = CDN_URL + fileName
  dispatch(saved(collectionId, { id, value: url }))
  loadImage(getImgSrc(url), () => clearFileSelect(dispatch))
  entityUpdate(firebase, { id, type, url })
  // console.log('done', getFileUrl(fileName))
}

export const uploadImage = (dispatch, agent) => ({ file, ...fileInfo }) => {
  const { contentSha1, fileName } = fileInfo
  const entity = { ...fileInfo, agent, id: contentSha1, type: 'MediaObject' }
  loadImageUrl(file, console.error, (imageInfo) => {
    if (!imageInfo) return entitySet(firebase, entity)
    const { dataUrl, ...size } = imageInfo
    entitySet(firebase, { ...entity, ...size })
    if (dataUrl) dispatch(meta(collectionId, imageInfo))
    return undefined
  })
  // @TODO Make sure there isn't already this file in the database.
  const uploadTask = storage.child(fileName).put(file)
  uploadTask.on('state_changed',
    onProgress(dispatch), console.error, onComplete(dispatch, entity)
  )
  return uploadTask
}
export const invalidType = ({ fileFormat }) =>
  error(collectionId, `Invalid file type. Expected ${ACCEPT_FILE_TYPE}, got ${fileFormat}.`)
export const invalidDots = dots =>
  error(collectionId, `The file name must have exactly 1 dot, found ${dots}.`)
// Select previous file selector error.
export const getError = fieldValue(collectionId, 'error')
// The number of dots in the name.
export const getDotCount = flow(property('name'), split('.'), size, add(-1))
// Upload a file.
export const handleUpload = file => (dispatch, getState) => {
  const state = getState()
  const dots = getDotCount(file)
  if (!file.isAccepted) {
    dispatch(invalidType(file))
  } else if (dots !== 1) {
    dispatch(invalidDots(dots))
  } else if (getError(state)) {
    dispatch(clearError(collectionId))
  }
  const item = findItemFromFile(state, file)
  console.log('item', item)
  dispatch(onBlur(collectionId, omitFile(file)))
  // clearFileSelect(dispatch)
  const agent = selectUser(state)
  // if (file) loadSha(file, uploadImage(dispatch, agent))
  console.log(file)
  return undefined
}

export const getImg = flow(
  pick(['dateCreated', 'name', 'url']),
  replaceField('url', getImgSrc)
)
export const getImages = createSelector(
  entityTypeSelector('MediaObject'),
  flow(
    map(getImg),
    orderBy('dateCreated', 'desc'),
  )
)
export const imageSelector = structuredSelector({
  accept: ACCEPT_FILE_TYPE,
  collectionId,
  images: getImages,
})
