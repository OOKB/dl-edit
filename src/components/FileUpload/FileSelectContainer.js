import { createSelector } from 'reselect'
import { partialRight } from 'lodash'
// import { structuredSelector } from 'cape-select'
import { onBlur, onDragEnter, onDragLeave } from 'redux-field'
import { createConnect, getFieldState } from '../capeField'
import Component from './FileSelect'

export const mapStateToProps = createSelector(
  partialRight(getFieldState, {}),
  ({ blur, focus }) => ({
    hasBlur: blur,
    hasFocus: focus,
  })
)

const actions = {
  onBlur,
  onDragEnter,
  onDragLeave,
}

export default createConnect(mapStateToProps, actions)(Component)
