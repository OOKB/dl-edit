import React, { PropTypes } from 'react'

import { handleSelect } from './dropZoneUtils'

import DropZone from './DropZone'
import FileInput from './FileInput'
import FileDetails from './FileDetails'

function FileSelect({ error, hasBlur, value, ...props }) {
  const onSelect = handleSelect(props)
  return (
    <div>
      {error && <p>{error}</p>}
      {hasBlur && <p className="uploading">Image Selected</p>}
      {!hasBlur &&
        <div>
          <DropZone {...props} onSelect={onSelect} />
          <FileInput {...props} onSelect={onSelect} />
        </div>
      }
      {value && <FileDetails {...value} />}
    </div>
  )
}
FileSelect.propTypes = {
  error: PropTypes.string,
  hasBlur: PropTypes.bool,
  value: PropTypes.shape({
    name: React.PropTypes.string,
  }),
}
export default FileSelect
