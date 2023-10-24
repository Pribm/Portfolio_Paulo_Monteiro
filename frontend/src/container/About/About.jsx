import React, {useState, useEffect, useContext} from 'react'
import './About.scss'
import { motion } from 'framer-motion'

import { client, urlFor } from '../../client'
import {AppWrapper, MotionWrapper} from '../../wrapper'
import Context from '../../Context'




const About = () => {
  const [abouts, setAbouts] = useState([])

  const [language] = useContext(Context)


  useEffect(() => {
   // const query = '*[_type == "abouts"]{title,imgUrl,description,language->{language}}'
   const query = `*[_type == "abouts" && language == "${language}"]`
    client.fetch(query).then(data => {
      setAbouts(data)
    })
  }, [language])

  return (
    <React.Fragment>
      <h2 className='head-text'>
        {language === "English" && 'Using technology'}
        {language === "Portuguese" && 'Usando tecnologia'}  
        <span>
        {language === "English" && 'and communication'}
        {language === "Portuguese" && ' e comunicação'}    
        </span>
        <br />
        {language === "English" && ' to'}
        {language === "Portuguese" && ' para'} 
        <span>
        {language === "English" && ' make new customers!'}
        {language === "Portuguese" && ' fazer novos clientes'} 
          
        </span>
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
              <h2 className='bold-text ' style={{marginTop: 20}}>{about.title}</h2>
              <p className='p-text' style={{marginTop: 10}}>{about.description}</p>
            </motion.div>
          )
        })}
      </div>
    </React.Fragment>
  )
}

export default AppWrapper(MotionWrapper(About, 'app__about'),'about', 'app__whitebg');
