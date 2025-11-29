import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import HomeScreen from './HomeScreen'
import GestaoTutor from './pages/GestaoTutor.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RegisterScreen from './pages/RegisterScreen.tsx';


const router = createBrowserRouter([
    {
        path: '/',
        element: <HomeScreen />,
    },
    {
        path: '/dashboard',
        element: <GestaoTutor />, 
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