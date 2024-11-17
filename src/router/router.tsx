import { createBrowserRouter } from 'react-router-dom'

import { ROUTE } from './route.model'

export const router = createBrowserRouter([
  {
    path: ROUTE.root,
    element: <div>home</div>,
  },
  {
    path: ROUTE.station(':stationId'),
    element: <div>station</div>,
  },
])
