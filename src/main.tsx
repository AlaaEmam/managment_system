import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import './modules/Shared/components/Header/header.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.min.js'

import App from './App.tsx'
import AuthContextProvider from './context/AuthContext.tsx'

createRoot(document.getElementById('root')!).render(
  <>
    <AuthContextProvider>
    <App />
    </AuthContextProvider>
    </>
)
