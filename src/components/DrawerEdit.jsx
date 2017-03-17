import React, { PropTypes } from 'react'
// import Button from './Button'
import Page from './Page'
import Fields from './Editable/Fields'

function EntityEdit({ id, title, ...props }) {
  console.log(props)
  return (
    <Page id="entity-edit">
      {title && <h1>{title}</h1>}
      {id && <p>ID: {id}</p>}
      {props.entity && <Fields {...props} />}
    </Page>
  )
}

EntityEdit.propTypes = {
  entity: PropTypes.shape({
    title: PropTypes.string,
    image: PropTypes.string,
  }),
  title: PropTypes.string,
}

export default EntityEdit
