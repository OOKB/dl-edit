import React, { PropTypes } from 'react'
import css from '../../style'
import { handleHover } from './dropZoneUtils'

const baseStyle = css('bgGray mw7 p2 m2 h7')
const styles = {
  base: baseStyle,
  onHover: { ...baseStyle, ...css('bgWashedBlue ba bw0p125') },
}

// Should only provide drop functionality. Nothing more. Use Uploading component to show progress.

function DropZone({ hasFocus, message, onDragEnter, onDragLeave, onDragOver, onSelect, style }) {
  const inlineStyle = hasFocus ? styles.onHover : styles.base
  return (
    <div
      style={{ ...inlineStyle, ...style }}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDragOver={onDragOver}
      onDrop={onSelect}
    >
      <p>{message}</p>
      {hasFocus && <p>Drop it</p>}
    </div>
  )
}

DropZone.propTypes = {
  hasFocus: PropTypes.bool,
  // id: PropTypes.string,
  onDragEnter: PropTypes.func,
  onDragLeave: PropTypes.func,
  onDragOver: PropTypes.func,
  // onDrop: PropTypes.func,
  onSelect: PropTypes.func,
  message: PropTypes.string.isRequired,
  style: PropTypes.object,
}
DropZone.defaultProps = {
  message: 'Drop in a new file to upload.',
  multiple: false,
  onDragOver: handleHover,
  style: {},
}
export default DropZone
