import React, { PropTypes } from 'react'
import { map } from 'lodash'
import { handleSelect } from '../../select/image'
import css from '../../style'
import Field from './Field'
import FileSelect from '../FileUpload/FileSelectContainer'

function Fields({ entity, fields, prefix, title }) {
  // console.log(entity)
  return (
    <div>
      {title && <h2>{title}</h2>}
      <ul style={css('lsNone m0 p0')}>
        {map(fields, field => (
          <li key={field.id}>
            {field.type === 'file' && <FileSelect
              {...field}
              collectionId={field.collectionId}
              initialValue={entity[field.id]}
              fieldId={prefix[1]}
              onSelect={handleSelect}
              prefix={prefix}
            />}
            {field.type !== 'file' && <Field
              {...field}
              initialValue={entity[field.id]}
              prefix={prefix}
            />}
          </li>
        ))}
      </ul>
    </div>
  )
}

Fields.propTypes = {
  dispatch: PropTypes.func,
  entity: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
  fields: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  prefix: PropTypes.arrayOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired,
}
Fields.defaultProps = {
  title: 'Edit Entity',
}
export default Fields
