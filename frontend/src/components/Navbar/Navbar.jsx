import React from 'react'
import { images } from '../../constants'
import './Navbar.scss'

import { HiMenuAlt4, HiX} from 'react-icons/hi'
import { motion } from 'framer-motion'


export const navLinks = ['home', 'about', 'work', 'skills','contact']


const Navbar = () => {

    const [toggle, setToggle] = React.useState(false)

    const NavBarLinks = ({mobile = false}) => {
        
        return (
            <ul className='app__navbar-links'>
            {navLinks.map((li, i) => (
                    
                        <li className={!mobile ? 'app__flex p-text' : ''} key={mobile ? i : `item-${i}`}>
                            {mobile ? '' : <div />}
                            <a href={`#${li}`} onClick={() => mobile && setToggle(false)}>{li}</a>
                        </li>
                ))}
            </ul>
        )
    }
    

  return (
    <nav className='app__navbar'>
        <div className='app__navbar-logo'>
            <img src={images.logo} alt="logo" />
        </div>
        
        <NavBarLinks/>

        <div className="app__navbar-menu">
            <HiMenuAlt4 onClick={() => setToggle(true)} />

            {
                toggle && (
                    <motion.div
                        whileInView={{x: [300, 0]}}
                        transition={{duration: 0.85, ease: 'easeIn'}}
                    >
                        <HiX onClick={() => setToggle(false)}/>
                        <NavBarLinks mobile/>
                    </motion.div>
                )

            }
        </div>
    </nav>
  )
}

export default Navbar
