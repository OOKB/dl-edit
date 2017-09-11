import { constant, flow, partial, property } from 'lodash'
import { createStructuredSelector } from 'reselect'
import { bindActionCreators } from 'redux'
import { createObj } from 'cape-lodash'
import { auth, logout } from 'cape-firebase'
import { getRouteId } from 'cape-router'
import css from 'cape-style'
import { filterPerms } from './perms'

export const getMenu = property('db.menu')
export const menuItems = filterPerms(getMenu)

const menuStyle = constant({
  action: css('ba br1 p1 inlineBlock fs1 textReset bgTrans'),
})

// Used for the component state.
export const menuSelector = createStructuredSelector({
  links: menuItems,
  activeId: getRouteId,
})

const actions = {
  auth,
  logout,
}
export const menuActions = flow(
  partial(bindActionCreators, actions),
  createObj('actions')
)
