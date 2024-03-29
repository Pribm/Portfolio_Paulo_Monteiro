import React from 'react'
import { images } from '../../constants'
import './Navbar.scss'

import { HiMenuAlt4, HiX} from 'react-icons/hi'
import { TbBulbOff, TbBulb } from 'react-icons/tb'
import { motion } from 'framer-motion'

import { AU, BR } from 'country-flag-icons/react/3x2'
import Context from '../../Context'


export let navLinks = ['home', 'about', 'work', 'skills','contact']


const Navbar = () => {

    const [toggle, setToggle] = React.useState(false)

    const [language, setLanguage, darkMode, setDarkMode] = React.useContext(Context)

    if(language === 'English'){
        navLinks = ['home', 'about', 'work', 'skills','contact']
    }
    if(language === 'Portuguese'){
        navLinks = ['home', 'Sobre mim', 'Trabalhos', 'Habilidades','Contato']
    }

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

        <div className='app__navbar-languages'>
            <div className='app__navbar-language'>
                <AU className={language === 'English' ? 'active' : ''} onClick={() => setLanguage('English')}/>
            </div>

            <div className='app__navbar-language'>
                <BR className={language === 'Portuguese' ? 'active' : ''} onClick={() => setLanguage('Portuguese')}/>
            </div>
            <div className='app__navbar-darkModeIcon'>
                {
                    darkMode ?
                    <TbBulb size={30} onClick={() => setDarkMode(false)}/>
                    :
                    <TbBulbOff size={30} onClick={() => setDarkMode(true)}/>
                }
            </div>
        </div>

            {/* {
                toggle && (
                    <motion.div
                        whileInView={{x: [300, 0]}}
                        transition={{duration: 0.85, ease: 'easeIn'}}
                    >
                        <HiX onClick={() => setToggle(false)}/>
                        <NavBarLinks mobile/>
                    </motion.div>
                )

            } */}

        {/* <div className="app__navbar-menu" onClick={() => setToggle(true)} >
            <HiMenuAlt4 />
        </div> */}
    </nav>
  )
}

export default Navbar
