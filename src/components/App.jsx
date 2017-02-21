import React from 'react'
import css from '../style'
import Page from './Page'

function AppEl() {
  return (
    <Page className="App">
      <p style={css('textCenter')}>Delaney and Long: Admin section</p>
    </Page>
  )
}
AppEl.propTypes = {
}
export default AppEl
