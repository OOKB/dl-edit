import React, { PropTypes } from 'react'
import css from '../style'
import Footer from './Footer'
import Header from './Header'

function Page({ children, className, id, style }) {
  return (
    <page className={className} id={id} style={style}>
      <Header />
      <main>
        <div style={css('p2')}>
          {children}
        </div>
      </main>
      <Footer />
    </page>
  )
}

Page.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  id: PropTypes.string,
  style: PropTypes.func,
}

export default Page
