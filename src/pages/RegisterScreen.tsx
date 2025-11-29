import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import axios from 'axios'; 

// Backend ta na porta 8000
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const RegisterScreen: React.FC = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        if (password !== confirmPassword) {
            alert('As senhas não coincidem!');
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post(`${API_URL}/api/register`, {
                name: name,
                email: email,
                password: password
            }, {
                withCredentials: false 
            });
            
            if (response.data.success) {
                alert(`Cadastro bem-sucedido! Por favor, faça login.`);
                navigate('/', { replace: true }); 
            }

        } catch (error: any) {
            console.error("Erro no cadastro:", error);
            
            if (error.response && error.response.status === 400) {
                alert("E-mail já em uso ou dados inválidos.");
            } else {
                alert("Falha no cadastro. Verifique a conexão com o servidor.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-background">
            <div className="register-card">
                <div className="logo-section">
                    <span role="img" aria-label="paw">🐾</span> AnimalHotels
                </div>
                
                <h2>Cadastre-se no<br/>**AnimalHotels**</h2>

                <form onSubmit={handleSubmit} className="register-form">
                    <div className="input-group">
                        <FaUser className="input-icon" />
                        <input
                            type="text"
                            placeholder="Nome Completo"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
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
                    <div className="input-group">
                        <FaLock className="input-icon" />
                        <input
                            type="password"
                            placeholder="Confirme a Senha"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="register-button" disabled={loading}>
                        {loading ? 'Cadastrando...' : 'Cadastrar'}
                    </button>
                </form>

                <div className="login-link">
                    Já tem conta? <Link to="/">**Faça Login**</Link>
                </div>
            </div>
        </div>
    );
};

export default RegisterScreen;