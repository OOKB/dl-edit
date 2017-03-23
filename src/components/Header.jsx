import React, { PropTypes } from 'react'
import css from '../style'

function HeaderEl({ siteName }) {
  return (
    <header id="siteHeader" className="bg-darkgray yellow" >
      {siteName && <div className="stripe"><h1 style={css('m0 fs1 p1')}>{siteName}</h1></div>}
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
