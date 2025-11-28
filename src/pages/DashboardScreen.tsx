import React from 'react';
import { useNavigate } from 'react-router-dom';
import authController from '../controllers/authController';

const DashboardScreen: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    console.log('Passando pelo arquivo DashboardScreen, metodo handleLogout, com as variaveis: <none>');
    const ok = await authController.logout();
    console.log(`O metodo handleLogout do arquivo DashboardScreen vai retornar: ok=${ok}`);
    if (ok) alert('Logout realizado com sucesso!');
    else alert('Erro ao realizar logout (tente novamente)');
    navigate('/');
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1>Painel de Controle do Animal Hotels</h1>
      <p>Gerenciamento de Tutores e Animais</p>
      
      
      <div style={{ marginTop: '30px' }}>
        <a 
          href="#/tutores"
          style={{ 
            padding: '10px 20px', 
            backgroundColor: '#4CAF50', 
            color: 'white', 
            textDecoration: 'none', 
            borderRadius: '5px',
            display: 'inline-block',
            marginRight: '10px'
          }}
        >
          Acessar Módulo Tutores
        </a>
      </div>

      <p style={{ marginTop: '40px' }}>
        <button 
          onClick={handleLogout}
          style={{
            padding: '10px 20px',
            backgroundColor: '#f44336',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Sair (Logout)
        </button>
      </p>
    </div>
  );
};

export default DashboardScreen;