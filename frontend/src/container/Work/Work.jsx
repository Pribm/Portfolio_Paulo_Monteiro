import React, { useState, useEffect, useContext } from 'react'
import {AppWrapper, MotionWrapper} from '../../wrapper';
import './Work.scss'

import { AiFillEye, AiFillGithub } from 'react-icons/ai'
import {Modal, Carousel} from 'react-bootstrap'

import { motion } from 'framer-motion'
import { client, urlFor } from '../../client';
import { arrayUnique } from '../../utilities';
import Context from '../../Context';
import { HiX } from 'react-icons/hi';

const Work = () => {

  const [isLoading, setLoading] = useState(true)
  const [show, setShow] = useState(false)
  const [modalImages, setModalImages] = useState([])

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
    const query = `*[_type == "works" && !(_id in path('drafts.**')) && language == "${language}"]`
    
    client.fetch(query)
      .then(data => {
        //console.log('fetching data')
        setWorks(data)
        setFilterWork(data)
        setLoading(false)
      })
  }, [language])

  useEffect(() => {
      setTags([])
      works.forEach(work => {
        setTags(tags => [...work.tags, ...tags])
      })
      setTags(tags => arrayUnique(tags))
  }, [works])

  

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

  const handleClose = () => setShow(false);

  const handleModalImage = work => {
    setShow(true)
    setModalImages(work.images)
  }



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


      <Modal show={show} centered className='app__modal' size="lg">
          <HiX onClick={handleClose}/>
          <Carousel className='app__modal-carousel' style={{height: '80vh'}}>
            {
              modalImages.map((modalImage, index) => {
                return (
                  <Carousel.Item key={index} style={{height: '80vh', backgroundColor: 'black'}}>
                    <img src={urlFor(modalImage)} alt={'carrousel'+index} style={{width: '100%', height: '100%', objectFit: 'scale-down'}}/>
                  </Carousel.Item>
                )
              })
            }
          </Carousel>
      </Modal>


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
                <img src={urlFor(work.images[0])} alt={''} />
                <motion.div
                  whileHover={{ opacity: [0, 1] }}
                  transition={{ duration: .25, ease: 'easeInOut', staggerChildren: .5 }}
                  className="app__work-hover d-md-flex d-none justify-content-center align-items-center"
                >
                  {
                    (work.photo_only !== true) ?
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
                    :
                    <div onClick={() => handleModalImage(work)} className='app__flex'>
                      <AiFillEye/>
                    </div>
                  }
                  {
                    !work.photo_only &&
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
                  }
                  
                </motion.div>
              </div>

              <div className='app__work-content app__flex'>
                <h4 className='bold-text' style={{ marginTop: 15 }}>{work.title}</h4>
                <p className='p-text' >{work.description}</p>
                <div className='app__work-tag app__flex'>
                  <p className='p-text'>{work.tags[0]}</p>
                </div>

                <div className="d-flex d-md-none app__work-content-mobile">
                {
                    (work.photo_only !== true) ?
                    <a href={work.projectLink} target="_blank" rel='noreferrer'>
                        <AiFillEye />
                    </a>
                    :
                    <div onClick={() => handleModalImage(work)}>
                      <AiFillEye/>
                    </div>
                  }
                  {
                    !work.photo_only &&
                    <a href={work.codeLink} target="_blank" rel='noreferrer'>
                      <AiFillGithub />
                    </a>
                  }
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
