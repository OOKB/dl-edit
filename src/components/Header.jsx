import React, { PropTypes } from 'react'
import css from '../style'
import { Menu } from './connected'

function HeaderEl({ siteName }) {
  return (
    <header id="siteHeader" className="bg-lightgray">
      {siteName && <div className="stripe bg-brown white"><h1 style={css('m0 fs1 p1')}>{siteName}</h1></div>}
      <nav><Menu /></nav>
    </header>
  )
}
HeaderEl.propTypes = {
  siteName: PropTypes.string,
}
HeaderEl.defaultProps = {
  siteName: 'CAPE Editor',
}
export default HeaderEl
