import { partial } from 'lodash'
import firebase from 'firebase'
import { firebase as config } from '../config'
import { entitySet, entityUpdate } from './util'

firebase.initializeApp(config)

export const TIMESTAMP = firebase.database.ServerValue.TIMESTAMP
export const auth = firebase.auth()
export const googleAuth = new firebase.auth.GoogleAuthProvider()
googleAuth.addScope('https://www.googleapis.com/auth/plus.login')

export const db = firebase.database().ref()
export const entity = db.child('entity')

export const storage = firebase.storage().ref()

export const baseFileUrl = 'https://storage.googleapis.com'

export function getFileUrl(fileName) {
  return [baseFileUrl, config.storageBucket, fileName].join('/')
}

export const save = partial(entitySet, { entity, TIMESTAMP })
export const update = partial(entityUpdate, { entity, TIMESTAMP })
