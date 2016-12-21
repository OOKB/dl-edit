import firebase from 'firebase'

export const config = {
  apiKey: 'AIzaSyDmoWCc7mwN02lTBrp0mKmh8oeu_k86C5U',
  authDomain: 'delanylong.firebaseapp.com',
  databaseURL: 'https://delanylong.firebaseio.com',
  storageBucket: 'delanylong.appspot.com',
}
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
