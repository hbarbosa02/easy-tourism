import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import Landing from './pages/Landing'
import Schedule from './pages/Schedule'

function Routes() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Landing} />
      <Route path="/schedule" component={Schedule} />
    </BrowserRouter>
  )
}

export default Routes
