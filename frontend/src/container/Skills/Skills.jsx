import React, {useState, useEffect} from 'react'

import { motion } from 'framer-motion'
import ReactTooltip from 'react-tooltip'

import {AppWrapper, MotionWrapper} from '../../wrapper'
import { urlFor, client } from '../../client'

import './Skills.scss'


const Skills = () => {

  const [skills, setSkills] = useState([])
  const [experiences, setExperiences] = useState([])

  useEffect(() => {
    const query = '*[_type == "experiences"]'
    const skillsQuery = '*[_type == "skills"]'

    client.fetch(skillsQuery).then(data => {
      setSkills(data)
    })

    client.fetch(query).then(data => {
      setExperiences(data)
    })
  }, [])

  return (
    <div className='app__skills'>
      <h2 className='head-text'>Skills</h2>
      <div className="app__skills-container">
        <motion.div className='app__skills-list'>
          {skills.map((skill, index) => {
            return (
              <motion.div
                whileInView={{opacity: [0,1]}}
                transition={{duration: .5}}
                className="app__skills-item app__flex"
                key={skill.name+index}
              >
                <div className='app__flex' style={{backgroundColor: skill.bgColor}}>
                  <img src={urlFor(skill.icon)+'?w=70&h=70'} alt={skill.name}/>
                </div>
                <p className='p-text' style={{marginTop: '15px'}}>{skill.name}</p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </div>
  )
}

export default AppWrapper(MotionWrapper(Skills, 'app__skills'), 'skills', 'app__whitebg');
