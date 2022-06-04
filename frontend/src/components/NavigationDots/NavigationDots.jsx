import React from 'react'
import { navLinks } from '../Navbar/Navbar'

const NavigationDots = ({active}) => {
  return (
    <div className="app__navigation">
        {navLinks.map((navLink, index) => {
            return (
                <React.Fragment key={navLink+index}>
                    <a
                    href={`#${navLink}`}
                    className="app__navigation-dot"
                    style={active === navLink ? {backgroundColor: '#313BAC'} : {}}
                    >
                    </a>
                </React.Fragment>
            )
        })}
    </div>
  )
}

export default NavigationDots
