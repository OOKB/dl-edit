import { createSelector } from 'reselect'
import { partialRight } from 'lodash'
// import { structuredSelector } from 'cape-select'
import { onBlur, onChange, onDragEnter, onDragLeave } from 'redux-field'
import { createConnect, getFieldState } from '../capeField'
import Component from './DropZone'

export const mapStateToProps = createSelector(
  partialRight(getFieldState, {}),
  ({ blur, focus }) => ({
    hasHover: focus,
    uploadStarted: blur,
  })
)

const actions = {
  onBlur,
  onChange,
  onDragEnter,
  onDragLeave,
}

export default createConnect(mapStateToProps, actions)(Component)
