import React, { Suspense, lazy } from 'react'
import { Navbar } from './components'
import { About, Footer, Skills, Work } from './container'
import './App.scss'
import Context from './Context'
import Loader from './components/Loader/Loader'

const Header = lazy(() => import('./container/Header/Header'))

export default function App() {

  const [language, setLanguage] = React.useState("English")
  const [darkMode, setDarkMode] = React.useState(true)
  
  return (
    <Context.Provider value={[language, setLanguage, darkMode, setDarkMode]}>
        <div className={`app ${darkMode ? 'dark-mode' : ''}`}>
          <Navbar/>
          <Suspense fallback={<Loader/>}>
            <Header/>
          </Suspense>
          <About/>
          <Work/>
          <Skills/>
          {/*<Testimonials/>*/}
          <Footer/>
      </div>
    </Context.Provider>
   
  )
}
