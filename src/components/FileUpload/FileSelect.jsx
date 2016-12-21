import React, { PropTypes } from 'react'

import { handleSelect } from './dropZoneUtils'

import DropZone from './DropZone'
import FileInput from './FileInput'
import FileDetails from './FileDetails'

function FileSelect({ hasBlur, value, ...props }) {
  const onSelect = handleSelect(props)
  return (
    <div>
      {hasBlur && <p className="uploading">Uploading</p>}
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
  hasBlur: PropTypes.bool,
  value: PropTypes.shape({
    name: React.PropTypes.string,
  }),
}
export default FileSelect
