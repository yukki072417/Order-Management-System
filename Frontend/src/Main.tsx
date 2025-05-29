import { createRoot } from 'react-dom/client'
import './Main.css'
import Header from './components/Header.tsx'
import App from './App.tsx';
import 'bootstrap/dist/css/bootstrap.min.css';

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <>
    <Header />
    <App />
  </>
  // </StrictMode>,
)
