import React from 'react'
import { NavigationDots, SocialMedia } from '../../components'

import './NavAndSocialMediaFrame.scss'

const NavAndSocialMediaFrame = () => {
  return (
    <div className='app__navAndSocialMediaFrame-container'>
        <SocialMedia/>
        <NavigationDots/>
    </div>
  )
}

export default NavAndSocialMediaFrame
