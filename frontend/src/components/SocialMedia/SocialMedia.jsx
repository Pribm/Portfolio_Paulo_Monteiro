import React from 'react'
import {BsGithub, BsInstagram} from 'react-icons/bs'
import {FaFacebookF} from 'react-icons/fa'

const SocialMedia = () => {
  return (
    <div className='app__social'>
        <a href="https://github.com/Pribm" target='_blank' rel='noreferrer'>
          <div>
              <BsGithub/>
          </div>
        </a>
        <a href="https://pt-br.facebook.com/paulovinicius.ribeiromonteiro" target='_blank' rel='noreferrer'>
          <div>
            <FaFacebookF/>
          </div>
        </a>
        <a href="https://www.instagram.com/pauloribm/" target='_blank' rel='noreferrer'>
          <div>
              <BsInstagram/>
          </div>
        </a>
    </div>
  )
}

export default SocialMedia
