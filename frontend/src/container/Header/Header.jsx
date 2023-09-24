import React, { useContext } from 'react'
import './Header.scss'

import { motion } from 'framer-motion'

import { AppWrapper, MotionWrapper } from '../../wrapper'

import { images } from '../../constants'
import './Header.scss'

import resume from '../../assets/PAULO VINÍCIUS RIBEIRO MONTEIRO - RESUME.pdf'
import Context from '../../Context'
import ThreeDBackGround from '../../components/3dBackground/ThreeDBackGround'

const scaleVariants = {
  whileInView: {
    scale: [0, 1],
    opacity: [0, 1],
    transition: {
      duration: 1,
      ease: 'easeInOut'
    }
  }
}

const Header = () => {

  const [language] = useContext(Context)

  return (
    <>
      <header className="app__header app__flex">
        <div className='app__header-background'>
          <ThreeDBackGround/>
        </div>

        <motion.div
          whileInView={{ x: [-100, 0], opacity: [0, 1] }}
          transition={{ duration: .5 }}
          className='app__header-info'
        >
          <div className="app__header-badge">
            <div className="badge-cmp app__flex">
              <span>👋</span>
              <div style={{ marginLeft: 20 }}>
                <p className="p-text">{language === "English" ? "Hello, I am" : "Oi, muito prazer, eu me chamo"}</p>
                <h1 className="head-text">Paulo Monteiro</h1>
              </div>
            </div>

            <div className="tag-cmp app__flex">
              <p className="p-text">{language === 'English' ? 'Web Developer' : 'Desenvolvedor Web'}</p>
              <p className="p-text">{language === 'English' ? 'Musician' : 'Músico'}</p>
              <p className="p-text">{language === 'English' ? 'Graphic Designer' : 'Designer Gráfico'}</p>
            </div>

            <div className='app__header-resumeDonwload'>
              <a href={resume} target={'_blank'} rel='noreferrer'>{language === 'English' ? 'See my Resume' : 'Baixar Curriculum'}</a>
            </div>
          </div>
        </motion.div>
      </header>
    </>
  )
}

export default MotionWrapper(AppWrapper(Header, 'home'));
