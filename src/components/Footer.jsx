import React from 'react'
import PropTypes from 'prop-types'
import css from 'cape-style'

function FooterEl({ siteId }) {
  return (
    <footer className="bg-darkgray yellow" style={css('p1')}>
      {siteId && <p>{siteId}</p>}
    </footer>
  )
}
FooterEl.defaultProps = {
  siteId: 'Built by OOKB/CAPE',
}
FooterEl.propTypes = {
  siteId: PropTypes.string,
}
export default FooterEl
