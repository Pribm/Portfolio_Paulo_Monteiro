import React, { useState } from 'react'
import './Loader.scss'

import NProgress from 'nprogress'

const Loader = () => {

    const [percent, setPercent] = useState(0)

    React.useEffect(() => {
        NProgress.inc()
        return () => NProgress.done()
    }, [])

    React.useEffect(() => {
        setPercent(100 - NProgress.status * 100)
    }, [NProgress.status])

    const loaderStyles = {
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: `calc(100vh - ${percent}vh)`, // Usando vh para altura dinâmica
        backgroundColor: 'black',
        transition: 'height 0.3s ease', // Transição suave de altura
        mixBlendMode: 'saturation',
    }

  return (
    <div className='app__loader'>
        <div className="app__loader_img_container">
            <div>
                <div className='app__loader_img_unloaded'/>
                <div
                style={loaderStyles} 
                />
                <p style={{
                    color: 'white',
                     textAlign: 'center'
                }}>
                    Loading...
                </p>
            </div>
        </div>
    </div>
  )
}

export default Loader