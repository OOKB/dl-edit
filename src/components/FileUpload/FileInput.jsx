import React, { PropTypes } from 'react'

import { handleOnDrop } from './dropZoneUtils'

// Should only provide drop functionality. Nothing more. Use Uploading component to show progress.

function FileInput(props) {
  const { accept, message, uploadStarted } = props
  // Display empty div when upload has started.
  if (uploadStarted) return <div className="uploading" />
  return (
    <div>
      <p>{message}</p>
      <input
        accept={accept}
        type="file"
        name="fileselect"
        onChange={handleOnDrop(props)}
      />
    </div>
  )
}

FileInput.propTypes = {
  accept: PropTypes.string,
  id: PropTypes.string,
  message: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  uploadStarted: PropTypes.bool,
}
FileInput.defaultProps = {
  message: 'Select a new file to upload.',
  multiple: false,
}
export default FileInput
