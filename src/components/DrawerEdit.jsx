import React, { PropTypes } from 'react'
import css from 'cape-style'
import Fields from 'cape-mixer/lib/Editable/Fields'
import Page from './Page'
import Drawer from './Drawer'

function EntityEdit({ id, title, entityType, ...props }) {
  const { entity } = props
  return (
    <Page id="entity-edit">
      {title && <h1 style={css('bb m0 fs2 p1 pl2 pr2')}>{title}</h1>}
      <div className="content">
        {id && <p style={{ textAlign: 'right' }}>ID: {id}</p>}
        {entity && props.entity.id &&
          <div className="editorTools">
            <Drawer {...entity} />
            <Fields {...props} prefix={[entityType, id]} />
          </div>
        }
      </div>
    </Page>
  )
}

EntityEdit.propTypes = {
  entity: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    image: PropTypes.shape({ id: PropTypes.string }),
  }),
  entityType: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  title: PropTypes.string,
}

export default EntityEdit
