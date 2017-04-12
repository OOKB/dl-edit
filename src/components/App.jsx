import React from 'react'
import css from 'cape-style'
import Page from './Page'

function AppEl() {
  return (
    <Page className="App">
      <p style={css('mt4 mb4 textCenter')}>Delaney and Long: Admin section</p>
    </Page>
  )
}
AppEl.propTypes = {
}
export default AppEl
