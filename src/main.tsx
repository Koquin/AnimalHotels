import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import HomeScreen from './HomeScreen'
import DashboardScreen from './pages/DashboardScreen.tsx'; 
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RegisterScreen from './pages/RegisterScreen.tsx';


const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeScreen />,
  },
  {
    path: '/dashboard',
    element: <DashboardScreen />,
  },
  {
    path: '/register', 
    element: <RegisterScreen />,
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)