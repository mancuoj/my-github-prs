import { Providers } from '@/providers'

import { App } from '@/routes'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Navigate, Route, Routes } from 'react-router'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Providers>
      <Routes>
        <Route index element={<App />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Providers>
  </StrictMode>,
)
