import { eq, flow, isMatch, partialRight } from 'lodash'
import { filter, get, map, omit, sortBy } from 'lodash/fp'
import { createSelector, createStructuredSelector } from 'reselect'
import { isAnonymous, isAuthenticated, selectUid } from 'cape-redux-auth'
import { selectGraph } from 'redux-graph'

export function validate(perms) {
  return ({ validator }) => !validator || isMatch(perms, validator)
}

export function filterItems(items, perms) {
  return flow(
    filter(validate(perms)),
    sortBy(['position', 'name']),
    map(omit(['position', 'validator']))
  )(items)
}
export function hasMicaEmail(state) {
  const getUserEmail = get(['GoogleUser', selectUid(state), 'email'])
  const userEmail = getUserEmail(selectGraph(state))
  const emailDomain = userEmail && userEmail.split('@')[1].toLowerCase()
  return eq(emailDomain, 'mica.edu')
}
export const isStudent = hasMicaEmail

export const permissions = createStructuredSelector({
  isAnonymous,
  isAuthenticated,
  isStudent,
})

export const filterPerms = partialRight(createSelector, permissions, filterItems)
export const getMenu = get('db.menu')
export const menuItems = filterPerms(getMenu)
