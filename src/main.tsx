import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { DatabaseProvider } from './context/DatabaseContext';
// import './style.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DatabaseProvider>
      <App />
    </DatabaseProvider>
  </StrictMode>
);
