import { flow, partial } from 'lodash'
import { add, get, map, orderBy, pick, size, split } from 'lodash/fp'
import { callWith, replaceField, set, setField, setKeyVal } from 'cape-lodash'
import { createSelector } from 'reselect'
import { getSelect, structuredSelector } from 'cape-select'
import { clear, fieldValue, meta, saved, saveProgress } from 'redux-field'
import { entityTypeSelector, isEntityCreatedDate } from 'redux-graph'
import { selectUser } from 'cape-redux-auth'
import { saveEntity } from 'cape-firebase'

import { CDN_URL } from '../config'
import { omitFile } from '../components/FileUpload/dropZoneUtils'
import { loadImage, loadImageUrl, loadSha } from '../components/FileUpload/processFile'
import { getIdFromFile, selectItems } from './items'
import firebase from '../firebase'

const { storage, update } = firebase

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

export const uploadImage = (dispatch, entity, { file, ...fileInfo }) => {

  loadImageUrl(file, console.error, (imageInfo) => {
    if (!imageInfo) return saveEntity(entity)
    const { dataUrl, ...sizes } = imageInfo
    saveEntity({ ...entity, ...sizes })
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


// Select previous file selector error.
export const getError = fieldValue(collectionId, 'error')
// The number of dots in the name.
export const getDotCount = flow(get('name'), split('.'), size, add(-1))

export function blurSelectorOmitFile({ onBlur }, file) {
  return onBlur(omitFile(file))
}

export const selectImages = entityTypeSelector('ImageObject')
export const findImage = getSelect(
  selectImages,
  fieldValue(collectionId, 'value.contentSha1'),
)

export const createImageEntity = state => flow(
  omitFile,
  setField('id', get('contentSha1')),
  setKeyVal('type', 'ImageObject'),
  setKeyVal('agent', selectUser(state))
)
// Get or create entity.
export const getOrCreateEntity = (file, state) => {
  const entity = get(file.contentSha1, selectImages(state))
  return entity || createImageEntity(state)(file)
}

export const ensureFileEntity = file => (dispatch, getState) => {
  const state = getState()
  const entity = getOrCreateEntity(file, state)
  // bytesTransferred
  if (entity.bytesTransferred === entity.contentSize) return dispatch(blurSelectorOmitFile(entity))
  // Save to firebase
  return dispatch(saveEntity(entity))
}
export const invalidTypeMsg = ({ fileFormat }) =>
  `Invalid file type. Expected ${ACCEPT_FILE_TYPE}, got ${fileFormat}.`
export const invalidDotsMsg = dots =>
  `The file name must have exactly 1 dot, found ${dots}.`

export function errorCheck(props, file) {
  const { clearError, error, onError } = props
  if (!file.isAccepted) {
    return onError(invalidTypeMsg(file))
  }
  const dots = getDotCount(file)
  if (dots !== 1) {
    return onError(invalidDotsMsg(dots))
  }
  if (error) {
    console.log('clearError')
    clearError()
  }
  return false
}

export const errorOrBlur = next => props => (file) => {
  const hasError = errorCheck(props, file)
  if (hasError) return hasError
  blurSelectorOmitFile(props, file)
  return next(props, file)
}
// FILE UPLOAD
export const handleSelect = errorOrBlur(({ dispatch }, file) => {
  loadSha(file).then((file2) => {
    const entity = dispatch(ensureFileEntity(file2))
    if (!entity.hasEntity) {
      uploadImage(dispatch, agent)
    }
  })
})

// A file has been selected. Upload a file. First func is props. Use that instead of thunk.
export const handleUpload = props => (file) => {
  // const hasError = errorCheck(props, file)
  // blurSelectorOmitFile(props, file)
  // clearFileSelect(dispatch)
  // loadSha(file, ensureFileEntity(dispatch, getState))
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
// Specific to item file upload page.
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
