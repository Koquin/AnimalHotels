import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TokenManager from '../utils/tokenManager';

export const useAuth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!TokenManager.isAuthenticated()) {
      navigate('/');
    }
  }, [navigate]);

  return {
    isAuthenticated: TokenManager.isAuthenticated(),
    userEmail: TokenManager.getUserEmail(),
    logout: () => {
      TokenManager.removeToken();
      navigate('/');
    }
  };
};

export default useAuth;
