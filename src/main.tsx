import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import RosaDoradaNails from './page/RosaDoradaNails.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RosaDoradaNails />
  </StrictMode>,
)