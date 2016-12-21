import { flow, partial } from 'lodash'
import { map, orderBy, pick } from 'lodash/fp'
import { replaceField } from 'cape-lodash'
import { clear, meta, onBlur, saved, saveProgress } from 'redux-field'
import { entityTypeSelector } from 'redux-graph'
import { createSelector } from 'reselect'
import { structuredSelector } from 'cape-select'
import { selectUser } from 'cape-redux-auth'

import { omitFile } from '../components/FileUpload/dropZoneUtils'
import { loadImage, loadImageUrl, loadSha } from '../components/FileUpload/processFile'
import * as firebase from '../fire'
import { entitySet, entityUpdate } from '../fire/util'

const { storage } = firebase

export const collectionId = 'file'
export const debugReturn = (item) => { console.log(item); return item }
export const onProgress = dispatch => flow(
  pick(['bytesTransferred', 'totalBytes']), partial(saveProgress, collectionId), dispatch
)
const cdnUrl = 'http://cape-f.imgix.net/'
export function getImgSrc(url) {
  return `${url}?crop=entropy&fit=crop&h=100&w=100`
}
export const onComplete = (dispatch, { id, fileName, type }) => () => {
  const url = cdnUrl + fileName
  dispatch(saved(collectionId, { id, value: url }))
  loadImage(getImgSrc(url), () => dispatch(clear(collectionId)))
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
// Upload a file.
export const handleUpload = file => (dispatch, getState) => {
  dispatch(onBlur(collectionId, omitFile(file)))
  const agent = selectUser(getState())
  if (file) loadSha(file, uploadImage(dispatch, agent))
  // console.log(file)
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
  collectionId,
  images: getImages,
})
