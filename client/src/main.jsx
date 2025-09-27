import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import { AccessibilityProvider } from './context/AccessibilityContext.jsx';
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <AccessibilityProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AccessibilityProvider>,
)
