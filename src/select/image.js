import { flow, partial } from 'lodash'
import { add, get, map, orderBy, pick, size, split } from 'lodash/fp'
import { callWith, replaceField, set, setField, setKeyVal } from 'cape-lodash'
import { createSelector } from 'reselect'
import { getSelect, structuredSelector } from 'cape-select'
import {
  clear, clearError, error, fieldValue, meta, onBlur, saved, saveProgress,
} from 'redux-field'
import { entityTypeSelector } from 'redux-graph'
import { selectUser } from 'cape-redux-auth'

import { CDN_URL } from '../config'
import { omitFile } from '../components/FileUpload/dropZoneUtils'
import { loadImage, loadImageUrl, loadSha } from '../components/FileUpload/processFile'
import { getIdFromFile, selectItems } from './items'
import { firebase } from '../redux/configureStore'

const { save, storage, update } = firebase

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
  update({ id, type, url })
  // console.log('done', getFileUrl(fileName))
}
export const getSha1 = get('contentSha1')
export const createFileEntity = agent => flow(
  omitFile,
  setField('id', getSha1),
  setKeyVal('type', 'MediaObject'),
  setKeyVal('agent', agent)
)
export const uploadImage = (dispatch, agent) => ({ file, ...fileInfo }) => {
  const { contentSha1, fileName } = fileInfo
  const entity = { ...fileInfo, agent, id: contentSha1, type: 'MediaObject' }
  loadImageUrl(file, console.error, (imageInfo) => {
    if (!imageInfo) return save(entity)
    const { dataUrl, ...sizes } = imageInfo
    save({ ...entity, ...sizes })
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
export const getDotCount = flow(get('name'), split('.'), size, add(-1))
export const blurSelector = partial(onBlur, collectionId)
export const blurSelectorOmitFile = flow(omitFile, blurSelector)

export const selectImages = entityTypeSelector('MediaObject')
export const findImage = getSelect(
  selectImages,
  fieldValue(collectionId, 'value.contentSha1'),
)

export const ensureFileEntity = (dispatch, getState) => (file) => {
  const state = getState()
  const entity = selectImages(state)[file.contentSha1]
  if (entity) return flow(set(file, 'hasEntity', true), blurSelectorOmitFile, dispatch)
  const agent = selectUser(state)
  save(createFileEntity(agent)(file))
  return file
}
// Upload a file.
export const handleUpload = file => (dispatch, getState) => {
  const state = getState()
  const dots = getDotCount(file)
  if (!file.isAccepted) {
    return dispatch(invalidType(file))
  } else if (dots !== 1) {
    return dispatch(invalidDots(dots))
  } else if (getError(state)) {
    dispatch(clearError(collectionId))
  }
  dispatch(blurSelectorOmitFile(file))
  // clearFileSelect(dispatch)
  loadSha(file, ensureFileEntity(dispatch, getState))
  // if (file) loadSha(file, uploadImage(dispatch, agent))
  // console.log(file)
  return undefined
}
export const findItemFromFile = getSelect(
  selectItems,
  flow(fieldValue(collectionId), getIdFromFile),
)

export const getImg = flow(
  pick(['dateCreated', 'name', 'url']),
  replaceField('url', getImgSrc)
)
export const getImages = createSelector(
  selectImages,
  flow(
    map(getImg),
    orderBy('dateCreated', 'desc'),
  )
)
export const imageSelector = structuredSelector({
  accept: ACCEPT_FILE_TYPE,
  collectionId,
  images: getImages,
  item: findItemFromFile,
})
