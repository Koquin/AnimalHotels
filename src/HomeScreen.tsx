import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from './components/auth/AuthForm'
import './HomeScreen.css'
import authController from './controllers/authController';


function HomeScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Passando pelo arquivo HomeScreen, metodo useEffect, com as variaveis: <mount>');
    (async () => {
      try {
        const valid = await authController.validateToken();
        console.log(`O metodo useEffect do arquivo HomeScreen vai retornar: valid=${valid}`);
        if (valid) {
          alert('Sessão ativa: redirecionando para o painel...');
          navigate('/dashboard');
        }
      } catch (error) {
        console.error('Erro ao validar sessão na inicialização:', error);
        console.log('O metodo useEffect do arquivo HomeScreen vai retornar: erro');
      }
    })();
  }, [navigate]);

  return (
    <AuthForm/>
  )
}

export default HomeScreen
