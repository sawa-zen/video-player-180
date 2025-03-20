import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { TopScreen } from './screens/TopScreen'
import './styles.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TopScreen />
  </StrictMode>,
)
