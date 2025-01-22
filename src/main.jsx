import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import { Provider } from 'react-redux';  // Import de Provider de react-redux
import App from './app/App.jsx'
import store from './app/Store.jsx';  // Import du store Redux

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>  {/* On entoure l'application avec le Provider et on passe le store */}
      <App />
    </Provider>
  </StrictMode>,
)
