import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ProviderList } from './providers/provider-list'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ProviderList>
      <RouterProvider router={router} />
    </ProviderList>
  </StrictMode>
)
