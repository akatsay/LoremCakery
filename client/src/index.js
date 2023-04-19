import React, {Suspense} from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { AppLoader } from './components/loaders/appLoader'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Suspense fallback={AppLoader}>
      <App />
    </Suspense>
  </React.StrictMode>
)
