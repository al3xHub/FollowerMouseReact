import './App.css'
import { useEffect, useState } from 'react'

function App() {

  const [enabled, setEnabled] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMove = (event) => {
      const { clientX, clientY } = event
      console.log(clientX, clientY)
      setPosition({ x: clientX, y: clientY })
    }

    if (enabled) {
      window.addEventListener('pointermove', handleMove)
    }

    return () => {
      window.removeEventListener('pointermove', handleMove)
      setPosition({ x: 0, y: 0 })
    }
  }, [enabled])


  useEffect(() =>{
    document.body.classList.toggle('no-cursor', enabled)

    return () =>{
      document.body.classList.remove('no-cursor')
    }
  }, [enabled])
  return (
    <>
      <div style={{
        position: 'absolute',
        top: -20,
        left: -20,
        width: 40,
        height: 40,
        backgroundColor: '#09f',
        borderRadius: '50%',
        opacity: 0.8,
        pointerEvents: 'none',
        transform: `translate(${position.x}px, ${position.y}px)`,
      }
      }>
      </div>

      <button onClick={() => setEnabled(!enabled)}>{enabled ? 'Deactivate' : 'Activate'} to follow mouse
      </button>
    </>
  )
}

export default App
