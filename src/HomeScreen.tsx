import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const HomeScreen: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [isVerifying, setIsVerifying] = useState(true);

    useEffect(() => {
        const verifySession = async () => {
            if (location.pathname === '/register') {
                 setIsVerifying(false);
                 return;
            }

            try {
                await axios.post(`${API_URL}/api/verify`, {}, {
                    withCredentials: true 
                });
                
                navigate('/dashboard', { replace: true });
            } catch (error) {
            } finally {
                setIsVerifying(false);
            }
        };

        verifySession();
    }, [navigate, location.pathname]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await axios.post(`${API_URL}/api/login`, { email, password }, { withCredentials: true }); 
            alert('Login bem-sucedido! Bem-vindo(a).');
            navigate('/dashboard', { replace: true });

        } catch (error: any) {
            if (error.response && error.response.status === 401) {
                alert("E-mail ou senha inválidos.");
            } else {
                alert("Ocorreu um erro na comunicação com o servidor.");
            }
        } finally {
            setLoading(false);
        }
    };
    if (isVerifying) {
        return <div className="auth-background"><div className="loading-message">Verificando sessão...</div></div>;
    }
    return (
        <div className="auth-background">
            <div className="register-card"> 
                <div className="logo-section">
                    <span role="img" aria-label="paw">🐾</span> AnimalHotels
                </div>
                
                <h2>Entre na Sua Conta</h2>

                <form onSubmit={handleSubmit} className="register-form">
                    <div className="input-group">
                        <FaEnvelope className="input-icon" />
                        <input
                            type="email"
                            placeholder="E-mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <FaLock className="input-icon" />
                        <input
                            type="password"
                            placeholder="Senha"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="register-button" disabled={loading}>
                        {loading ? 'Entrando...' : 'Entrar'}
                    </button>
                </form>

                <div className="login-link">
                    Não tem conta? <Link to="/register">**Cadastre-se aqui**</Link>
                </div>
            </div>
        </div>
    );
};

export default HomeScreen;