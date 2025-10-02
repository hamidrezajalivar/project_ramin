import './index.css'

import App from './App.jsx'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ConfigProvider } from "antd";
import faIR from "antd/locale/fa_IR";
import { ToastContainer, Bounce } from "react-toastify";
createRoot(document.getElementById('root')).render(
  <StrictMode>
   <ConfigProvider locale={faIR} direction="rtl">
    <App />
   </ConfigProvider>
   <ToastContainer
            position="bottom-right"
            autoClose={1000}
            limit={1}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={true}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition={Bounce}
          />
  </StrictMode>,
)
