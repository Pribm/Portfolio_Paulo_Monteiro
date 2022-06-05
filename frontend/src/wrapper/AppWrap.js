import React, {useContext} from 'react'
import { NavigationDots, SocialMedia } from '../components'
import Context from '../Context'

const AppWrap = (Component, idName, classNames) => function HOC() {

  const [language] = useContext(Context)

  return (
    <div id={idName} className={`app__container ${classNames}`}>
      <SocialMedia/>
      <div className='app__wrapper app__flex'>
        <Component />

        <div className='copyright'>
          <p className='p-text'>
            @2022 Paulo Monteiro
          </p>

          <p className='p-text'>
            {language === "English" ? "All rights reserved" : "Todos os direitos reservados"}
          </p>
        </div>
      </div>

      <NavigationDots active={idName}/>
    </div>
  )
}

export default AppWrap
