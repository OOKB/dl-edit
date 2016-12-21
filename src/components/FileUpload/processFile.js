import sha1Hash from 'simple-sha1'
import { flow, last, partial, toLower } from 'lodash'
import { at, join, split } from 'lodash/fp'
import { doProp, set, setField } from 'cape-lodash'

/* global window */

export const extConvert = {
  jpg: 'jpeg',
  yml: 'yaml',
}
export function convertExt(ext) { return extConvert[ext] || ext }
export const getExt = flow(split('.'), last, toLower, convertExt)
export const setExt = setField('ext', doProp(getExt, 'name'))
export const getFileName = flow(at(['contentSha1', 'ext']), join('.'))
export const setFileName = setField('fileName', getFileName)
export const setFields = flow(setExt, setFileName)
export function loadSha(file, next) {
  const reader = new window.FileReader()
  reader.onloadend = () => sha1Hash(reader.result, flow(
    partial(set, file, 'contentSha1'), setFields, next
  ))
  reader.readAsArrayBuffer(file.file)
}
// export const fileName = over()
export function loadImageUrl(file, onError, onSuccess) {
  if (file.size > 4100069) return onSuccess()
  const reader = new window.FileReader()
  reader.onloadend = () => {
    const img = new window.Image()
    img.onerror = () => onError(
      'Invalid image file. The file is corrupt or has an the wrong filename extension.'
    )
    img.onload = () => {
      // console.log(img.width, img.height)
      const image = {
        height: { unitCode: 'E37', value: img.height, unitText: 'pixel' },
        width: { unitCode: 'E37', value: img.width, unitText: 'pixel' },
      }
      // Include fileData base64 thing.
      image.dataUrl = reader.result
      onSuccess(image)
    }
    img.src = reader.result
  }
  return reader.readAsDataURL(file)
}
export function loadImage(url, onSuccess) {
  const img = new window.Image()
  img.onload = onSuccess
  img.src = url
}
