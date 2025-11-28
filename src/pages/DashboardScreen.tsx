import React from 'react';
import { Link } from 'react-router-dom'; // Importe o Link para navegação

const DashboardScreen: React.FC = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1>Painel de Controle do Animal Hotels</h1>
      <p>Gerenciamento de Tutores e Animais</p>
      
      <div style={{ marginTop: '30px' }}>
        {/* Este é o link para a próxima seção que você irá construir */}
        <Link to="/tutores" style={{ 
          padding: '10px 20px', 
          backgroundColor: '#4CAF50', 
          color: 'white', 
          textDecoration: 'none', 
          borderRadius: '5px' 
        }}>
          Acessar Módulo Tutores
        </Link>
      </div>

      {/* Simulação de Logout */}
      <p style={{ marginTop: '40px' }}>
        <Link to="/" onClick={() => alert('Logout simulado realizado!')}>Sair</Link>
      </p>
    </div>
  );
};

export default DashboardScreen;