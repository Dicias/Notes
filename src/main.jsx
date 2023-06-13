import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import '../manifest.json'
import './index.css'
import './scss/notas.css'
import './scss/notasAct.css'
import './scss/modal.css'
import './scss/foteer.css'



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
