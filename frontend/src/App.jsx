import React from 'react'
import { Navbar } from './components'
import { About, Footer, Header, Skills, Work } from './container'

import './App.scss'
import Context from './Context'

export default function App() {

  const [language, setLanguage] = React.useState("English")
  
  return (
    <Context.Provider value={[language, setLanguage]}>
        <div className='app'>
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
