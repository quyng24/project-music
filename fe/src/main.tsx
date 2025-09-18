import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import RoleProvider from './context/roleName.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClỉent = new QueryClient();

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <RoleProvider>
        <QueryClientProvider client={queryClỉent}>
          <App />
        </QueryClientProvider>
      </RoleProvider>
    </StrictMode>,
  );
}
