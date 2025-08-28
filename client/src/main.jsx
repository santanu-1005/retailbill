
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { store } from './store/store.js'
import { StrictMode } from 'react'
import { ToastContainer } from 'react-toastify'

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <Provider store={store}>
      <ToastContainer position="top-right" autoClose={3000} />
      <App />
    </Provider>
  </StrictMode>

)
