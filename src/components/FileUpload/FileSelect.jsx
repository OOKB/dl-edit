import React from 'react'

import { handleSelect } from './dropZoneUtils'

import DropZone from './DropZone'
import FileInput from './FileInput'
// Should only provide drop functionality. Nothing more. Use Uploading component to show progress.

function FileSelect(props) {
  const onSelect = handleSelect(props)
  return (
    <div>
      <DropZone {...props} onSelect={onSelect} />
      <FileInput {...props} onSelect={onSelect} />
    </div>
  )
}

export default FileSelect
