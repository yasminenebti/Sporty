import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter , Route , Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './redux/store.js'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
      <Routes>
        <Route path='/*' element={<App />}></Route>
        </Routes> 
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
)
