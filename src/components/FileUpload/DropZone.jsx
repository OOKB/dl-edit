import React, { PropTypes } from 'react'
import css from '../../style'
import { handleHover } from './dropZoneUtils'

const baseStyle = css('bgGray mw7 p2 m2 h7')
const styles = {
  base: baseStyle,
  onHover: { ...baseStyle, ...css('bgWashedBlue ba bw0p125') },
}

// Should only provide drop functionality. Nothing more. Use Uploading component to show progress.

function DropZone({ hasFocus, message, onSelect, style, hasBlur, ...rest }) {
  // Display empty div when upload has started.
  if (hasBlur) return <div className="uploading" />
  const inlineStyle = hasFocus ? styles.onHover : styles.base
  // console.log(rest)
  return (
    <div {...rest} style={{ ...inlineStyle, ...style }} onDrop={onSelect}>
      <p>{message}</p>
      {hasFocus && <p>Drop it</p>}
    </div>
  )
}

DropZone.propTypes = {
  // hasBlur: PropTypes.bool,
  hasFocus: PropTypes.bool,
  id: PropTypes.string,
  onDragEnter: PropTypes.func,
  onDragLeave: PropTypes.func,
  onDragOver: PropTypes.func,
  onDrop: PropTypes.func,
  onSelect: PropTypes.func,
  message: PropTypes.string.isRequired,
  style: PropTypes.object,
  hasBlur: PropTypes.bool,
}
DropZone.defaultProps = {
  message: 'Drop in a new file to upload.',
  multiple: false,
  onDragOver: handleHover,
  style: {},
}
export default DropZone
