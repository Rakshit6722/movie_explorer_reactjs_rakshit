import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import store, { persistor } from './redux/store.ts'
import { Provider } from 'react-redux'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { PersistGate } from 'redux-persist/integration/react'
import { AuthProvider } from './context/AuthContext.tsx'
import StripeProvider from './context/StripeProvider.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StripeProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <AuthProvider>
              <App />
            </AuthProvider>
            <ToastContainer />
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </StripeProvider>
  </StrictMode>
)
