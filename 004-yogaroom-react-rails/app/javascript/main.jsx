import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import "./components/AppRoutes.jsx"
import "./features/Home.jsx"


ReactDOM.createRoot(document.getElementById('main-container')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
