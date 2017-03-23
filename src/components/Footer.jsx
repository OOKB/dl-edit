import React, { PropTypes } from 'react'

function FooterEl({ siteId }) {
  return (
    <footer>
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
