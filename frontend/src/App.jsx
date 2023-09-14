import React from 'react'
import { Navbar } from './components'
import { About, Footer, Header, Skills, Work } from './container'

import './App.scss'
import Context from './Context'

export default function App() {

  const [language, setLanguage] = React.useState("English")
  const [darkMode, setDarkMode] = React.useState(true)
  
  return (
    <Context.Provider value={[language, setLanguage, darkMode, setDarkMode]}>
        <div className={`app ${darkMode ? 'dark-mode' : ''}`}>
          <Navbar/>
          <Header/>
          <About/>
          <Work/>
          <Skills/>
          {/*<Testimonials/>*/}
          <Footer/>
      </div>
    </Context.Provider>
   
  )
}
