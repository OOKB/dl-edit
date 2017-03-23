import React, { PropTypes } from 'react'
// import Button from './Button'
import css from '../style'
import Page from './Page'
import Fields from './Editable/Fields'

function EntityEdit({ id, title, entityType, ...props }) {
  return (
    <Page id="entity-edit">
      {title && <h1 style={css('bb m0 fs2 p1 pl2 pr2')}>{title}</h1>}
      <div className="content">
        {id && <p>ID: {id}</p>}
        {props.entity && <Fields {...props} prefix={[entityType, id]} />}
      </div>
    </Page>
  )
}

EntityEdit.propTypes = {
  entity: PropTypes.shape({
    title: PropTypes.string,
    image: PropTypes.string,
  }),
  entityType: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  title: PropTypes.string,
}

export default EntityEdit
