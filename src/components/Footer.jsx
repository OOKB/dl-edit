import React, { PropTypes } from 'react'

function FooterEl({ siteId }) {
  return (
    <footer>
      <p>
        links to OOKB/CAPE or something? anything else needed down here?
        contact info for KB if they need help?
      </p>
      {siteId && <p>{siteId}</p>}
    </footer>
  )
}
FooterEl.defaultProps = {
}
FooterEl.propTypes = {
  siteId: PropTypes.string,
}
export default FooterEl
