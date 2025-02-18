import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import Background from './components/Background/Background.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <Background />
  </StrictMode>,
)
