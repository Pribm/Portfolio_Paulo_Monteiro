import React, { useState, useEffect, useContext } from 'react'
import {AppWrapper, MotionWrapper} from '../../wrapper';
import './Work.scss'

import { AiFillEye, AiFillGithub } from 'react-icons/ai'
import { motion } from 'framer-motion'
import { client, urlFor } from '../../client';
import { arrayUnique } from '../../utilities';
import Context from '../../Context';

const Work = () => {

  const [isLoading, setLoading] = useState(true)
  const [works, setWorks] = useState([])
  const [tags, setTags] = useState([])

  const [filterWork, setFilterWork] = useState([])

  const [activeFilter, setActiveFilter] = useState('all')
  const [animateCard, setAnimateCard] = useState({
    y: 0,
    opacity: 1
  })

  const [language] = useContext(Context)

  useEffect(() => {
    const query = `*[_type == "works" && language == "${language}"]`
    client.fetch(query)
      .then(data => {
        setWorks(data)
        setFilterWork(data)
        setLoading(false)
      })
  }, [language])

  useEffect(() => {
    console.log(works)
    if (!isLoading) {
      works.forEach(work => {
        setTags(tags => [
          ...tags,
          ...work.tags
        ])
      })

      setTags(tags => arrayUnique(tags))
    }
  }, [isLoading])

  

  const handleWorkFilter = (item) => {
    setActiveFilter(item);
    setAnimateCard([{ y: 100, opacity: 0 }]);

    setTimeout(() => {
      setAnimateCard([{ y: 0, opacity: 1 }]);

      if (item === 'All') {
        setFilterWork(works);
      } else {
        setFilterWork(works.filter((work) => work.tags.includes(item)));
      }
    }, 500);
  };

  return (
    <div className='app__work'>
      {language === "English" && 
        <h2 className='head-text'>
          My creative
          <span> Portfolio</span>
          <br />
          Section
        </h2>
      }

      {language === "Portuguese" && 
        <h2 className='head-text'>
          Meus projetos
          <span> Criativos</span>
        </h2>
      }
      <div className="app__work-filter">
        {!isLoading && tags.sort((a,b) => a > b ? 1 : -1).map((item, index) => {
          return (
            <div
              key={index}
              onClick={() => handleWorkFilter(item)}
              className={`app__work-filter-item app__flex p-text ${activeFilter === item ? 'item-active' : ''}`}
            >
              {item}
            </div>
          )
        })}
      </div>

      <motion.div
        animate={animateCard}
        transition={{ duration: 0.5, delayChildren: 0.5 }}
        className="app__work-portfolio"
      >
        {filterWork.map((work, index) => {
          return (
            <div className='app__work-item app__flex' key={index}>
              <div className="app__work-img app__flex">

                <img src={urlFor(work.imgUrl.asset._ref)} alt={''} />

                <motion.div
                  whileHover={{ opacity: [0, 1] }}
                  transition={{ duration: .25, ease: 'easeInOut', staggerChildren: .5 }}
                  className="app__work-hover app__flex"
                >
                  <a href={work.projectLink} target="_blank" rel='noreferrer'>
                    <motion.div
                      whileInView={{ scale: [0, 1] }}
                      whileHover={{ scale: [1, .9] }}
                      transition={{ duration: .25 }}
                      className="app__flex"
                    >
                      <AiFillEye />
                    </motion.div>
                  </a>

                  <a href={work.codeLink} target="_blank" rel='noreferrer'>
                    <motion.div
                      whileInView={{ scale: [0, 1] }}
                      whileHover={{ scale: [1, .9] }}
                      transition={{ duration: .25 }}
                      className="app__flex"
                    >
                      <AiFillGithub />
                    </motion.div>
                  </a>
                </motion.div>
              </div>

              <div className='app__work-content app__flex'>
                <h4 className='bold-text' style={{ marginTop: 15 }}>{work.title}</h4>
                <p className='p-text' >{work.description}</p>

                <div className='app__work-tag app__flex'>
                  <p className='p-text'>{work.tags[0]}</p>
                </div>
              </div>
            </div>
          )
        })}
      </motion.div>
    </div>
  )
}

export default AppWrapper(MotionWrapper(Work, 'app__work'), 'work', 'primarybg');
