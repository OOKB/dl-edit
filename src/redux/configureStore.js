import { merge } from 'lodash'
import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import reducer from 'cape-redux-reducer'
import { createSizeAction, createRemAction, listenResize } from 'redux-windowsize'
import initializeFirebase, { fireMiddleware, reduxFirebase } from 'cape-firebase'

import {
  getInitState,
  historyMiddleware,
  syncHistoryWithStore,
} from 'redux-history-sync'
import { entities, firebaseConfig } from '../config'

export const firebase = initializeFirebase(firebaseConfig)
// Build func to listen for firebase changes and dispatch to redux.
const storeListener = reduxFirebase(entities)

/* global window */

const middleware = [
  historyMiddleware(window.history),
  fireMiddleware(firebase, entities),
  // socket,
  // cookieMiddleware,
  thunk,
]
/* eslint-disable no-underscore-dangle */
const composeEnhancers = (
  process.env.NODE_ENV !== 'production' &&
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
) || compose
/* eslint-enable */

// Configure and create Redux store.
// Function requires an initialState object.
export default function configureStore(initialState) {
  const calculatedState = {
    history: getInitState(window.location, window.document.title, window.history),
    session: {
      currentYear: new Date().getFullYear(),
    },
  }
  const initState = merge(initialState, calculatedState)
  const store = createStore(
    reducer,
    initState,
    composeEnhancers(
      applyMiddleware(...middleware),
    )
  )
  syncHistoryWithStore(store, window)
  storeListener(firebase, store)
  store.dispatch(createSizeAction(window))
  store.dispatch(createRemAction(window))
  listenResize(store, window)
  return store
}
