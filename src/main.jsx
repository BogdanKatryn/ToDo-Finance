import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { registerSW } from 'virtual:pwa-register'

registerSW({
  onNeedRefresh() {
    console.log('⚡ Доступна новая версия приложения')
  },
  onOfflineReady() {
    console.log('✅ Приложение готово работать оффлайн')
  }
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
