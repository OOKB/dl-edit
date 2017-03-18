import React, { PropTypes } from 'react'
import { Menu } from './connected'

function HeaderEl({ siteName }) {
  return (
    <header id="siteHeader">
      <nav><Menu /></nav>
      {siteName && <p>{siteName}</p>}
    </header>
  )
}
HeaderEl.propTypes = {
  siteName: PropTypes.string,
}
HeaderEl.defaultProps = {
}
export default HeaderEl
