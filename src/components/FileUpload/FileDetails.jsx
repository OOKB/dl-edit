import React, { PropTypes } from 'react'
import { humanFileSize } from './dropZoneUtils'

function FileDetails({ contentSize, height, name, width }) {
  const humanSize = humanFileSize(contentSize)
  return (
    <div className="dz-details">
      <div className="dz-filename"><span>{name}</span></div>
      <div className="dz-size">
        <span className="dz-size-value">{humanSize.value}</span>
        <span className="dz-size-unit">{humanSize.unitText}</span>
      </div>
      {height && width && (
        <div>
          <span>{width.value}</span>
          <span>x</span>
          <span>{height.value}</span>
        </div>
      )}
    </div>
  )
}
FileDetails.propTypes = {
  contentSize: PropTypes.number.isRequired,
  height: PropTypes.object,
  name: PropTypes.string.isRequired,
  width: PropTypes.object,
}
FileDetails.defaultProps = {
}
export default FileDetails
