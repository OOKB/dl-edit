import React, { PropTypes } from 'react'
import css from '../style'
import Footer from './Footer'
import Header from './Header'
import { Menu } from './connected'

function Page({ children, className, id, style }) {
  return (
    <page className={className} id={id} style={style}>
      <Header />
      <main>
        <nav className="bg-lightgray"><Menu /></nav>
        <div>
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
