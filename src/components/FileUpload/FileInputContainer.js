import { createSelector } from 'reselect'
import { partialRight } from 'lodash'
// import { structuredSelector } from 'cape-select'
import { onChange } from 'redux-field'
import { createConnect, getFieldState } from '../capeField'
import Component from './FileInput'

export const mapStateToProps = createSelector(
  partialRight(getFieldState, {}),
  ({ blur, focus }) => ({
    hasHover: focus,
    uploadStarted: blur,
  })
)

const actions = {
  onChange,
}

export default createConnect(mapStateToProps, actions)(Component)
