import React, {useState, useContext} from 'react'
import './Footer.scss'

import {AppWrapper, MotionWrapper} from '../../wrapper'
import { images } from '../../constants'

import {client} from '../../client'
import Context from '../../Context'

const Footer = () => {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const [formSubmitted, setFormSubmitted] = useState(false)
  const [loading, setloading] = useState(false)

  const [language] = useContext(Context)

  const handleSubmit = () => {
    setloading(true);

    const contact = {
      _type: 'contact',
      name,
      email,
      message
    }

    client.create(contact)
    .then(() => {
      setloading(false)
      setFormSubmitted(true)
    })
  }

  return (
    <div className='app__footer' >
      <div className='head-text'>
        {
          language === "English" &&
          <>
            <h2 >
            Keep in touch with me,
            </h2>
            <span>let's work together!</span>
          </>
        }

        {
          language === "Portuguese" &&
          <>
            <h2 >
            Entre em contato,
            </h2>
            <span>vamos trabalhar juntos!</span>
          </>
        }
        🧑‍💻
      </div>


      <div className="app__footer-cards">
        <div className="app__footer-card">
          <img src={images.email} alt="email" />
          <a href="mailto:monteiro.paulovinicius@gmail.com" className='p-text text-black'>{language === "English" ? "Send me an email!" : "Envie-me um email"}</a>
        </div>

        <div className="app__footer-card">
          <img src={images.mobile} alt="mobile" />
          <a href="tel:+55 (092)982772050" className='p-text text-black'>{language === "English" ? "Contact me by phone!" : "Entre em contato por telefone"}</a>
        </div>
      </div>

      {/* {
        !formSubmitted ? 
        <div className='app__footer-form app__flex'>
        <div className="app__flex">
          <input type="text" className="p-text" placeholder={language === "English" ? "Your Name!" : "Seu Nome"} value={name} onChange={e => setName(e.target.value)}/>
        </div>

        <div className="app__flex">
          <input type="email" className="p-text" placeholder={language === "English" ? 'Your E-Mail' : "Seu E-Mail"} value={email} onChange={e => setEmail(e.target.value)}/>
        </div>

        <div>
          <textarea
          className='p-text'
          placeholder={language === "English" ? 'Your Message' : "Sua Mensagem"} 
          value={message}
          onChange={e => setMessage(e.target.value)}
          />
        </div>

        <button type='button' className='p-text' onClick={handleSubmit}>
        {language === "English" ?
            loading ? 'Sending...' : 'Send Message'  
          :
            loading ? 'Enviando...' : 'Enviar Messagem' 
        }
        </button>
      </div>
      :
      <div>
        <h3 className='head-text'>Thanks for getting in touch! 🙂</h3>
      </div>
      } */}
    </div>
  )
}

export default AppWrapper(MotionWrapper(Footer, 'app__primarybg'), 'contact');
