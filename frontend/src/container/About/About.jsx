import React, {useState, useEffect} from 'react'
import './About.scss'
import { motion } from 'framer-motion'

import {images} from '../../constants'
import { client, urlFor } from '../../client'
import {AppWrapper, MotionWrapper} from '../../wrapper'




const About = () => {

  const [abouts, setAbouts] = useState([])

  useEffect(() => {
    const query = '*[_type == "abouts"]'
    client.fetch(query).then(data => {
      setAbouts(data)
    })
  }, [])

  return (
    <React.Fragment>
      <h2 className='head-text'>
        Using technology 
        <span> and communication</span>
        <br />
        and 
        <span> making new customers!</span>
      </h2>

      <div className="app__profiles">
        {abouts.sort((about1, about2) =>  new Date(about1._createdAt) - new Date(about2._createdAt)).map((about, index) => {
          return (
            <motion.div
              whileInView={{opacity: 1}}
              whileHover={{scale: 1.1}}
              transition={{duration: .5, type: 'tween'}}
              className='app__profile-item'
              key={about.title+index}
            >
              <img src={urlFor(about.imgUrl)} alt={about.title} />
              <h2 className='bold-text' style={{marginTop: 20}}>{about.title}</h2>
              <p className='p-text' style={{marginTop: 10}}>{about.description}</p>
            </motion.div>
          )
        })}
      </div>
    </React.Fragment>
  )
}

export default AppWrapper(MotionWrapper(About, 'app__about'),'about', 'app__whitebg');
