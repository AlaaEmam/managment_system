import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import './modules/Shared/components/Header/header.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.min.js'
import '../node_modules/@fortawesome/fontawesome-free/css/all.min.css'

import App from './App.tsx'
import AuthContextProvider from './context/AuthContext.tsx'
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css"
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import '@fortawesome/fontawesome-free/css/all.min.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.min.js'
import '../node_modules/@fortawesome/fontawesome-free/css/all.min.css'
createRoot(document.getElementById('root')!).render(
  <>
    <AuthContextProvider>
    <App />
    </AuthContextProvider>
    </>
)
