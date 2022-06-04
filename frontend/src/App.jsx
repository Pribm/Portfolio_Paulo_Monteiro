import React from 'react'
import { Navbar } from './components'
import { About, Footer, Header, Skills, Testimonials, Work } from './container'

import './App.scss'

export default function App() {
  return (
   <div className='app'>
     <Navbar/>
     <Header/>
     <About/>
     <Work/>
     <Skills/>
     {/*<Testimonials/>*/}
     <Footer/>
   </div>
  )
}
