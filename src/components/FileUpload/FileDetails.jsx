import React, { PropTypes } from 'react'

import FileSize from './FileSize'
import Label from './Label'

function FileDetails({ contentSize, fileFormat, height, lastModified, name, width }) {
  return (
    <div className="dz-details">
      <div className="dz-filename"><Label text="Name:" />{name}</div>
      <div className="dz-fileformat"><Label text="Format:" />{fileFormat}</div>
      <div className="dz-filemodified"><Label text="Modified:" />{lastModified}</div>
      { contentSize && <FileSize contentSize={contentSize} />}
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
  fileFormat: PropTypes.string,
  height: PropTypes.shape({ value: PropTypes.number }),
  lastModified: PropTypes.number,
  name: PropTypes.string.isRequired,
  width: PropTypes.shape({ value: PropTypes.number }),
}
FileDetails.defaultProps = {
}
export default FileDetails
