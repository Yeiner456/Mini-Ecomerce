import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ProyectoApp } from './ProyectoApp'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ProyectoApp/>
  </StrictMode>,
)
