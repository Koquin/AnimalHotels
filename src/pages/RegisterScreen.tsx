import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import InputField from '../components/ui/InputField'; 
import Button from '../components/ui/Button'; 
import authController from '../controllers/authController'; 

const RegisterScreen: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    
    const navigate = useNavigate();

    const handleRegister = async (e: React.FormEvent) => {
        console.log(`Passando pelo arquivo RegisterScreen, metodo handleRegister, com as variaveis: name=${name}, email=${email}, password=***, confirmPassword=***`);
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            console.log('O metodo handleRegister do arquivo RegisterScreen vai retornar: senhas não coincidem');
            setError("As senhas não coincidem!");
            alert("As senhas não coincidem!");
            return;
        }

        const registerResult = await authController.registerUser(name, email, password);
        console.log(`O metodo handleRegister do arquivo RegisterScreen vai retornar: success=${registerResult.success}`);

        if (registerResult.success) {
            alert(registerResult.message + " Faça login.");
            navigate('/');
        } else {
            setError(registerResult.message);
            alert(`Erro: ${registerResult.message}`);
        }
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Cadastre-se no AnimalHotels</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            
            <form onSubmit={handleRegister} style={{ maxWidth: '400px', margin: '0 auto' }}>
                
                <InputField
                    type="text"
                    label="Nome Completo"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Seu nome completo"
                />

                <InputField
                    type="email"
                    label="E-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seuemail@exemplo.com"
                />

                <InputField
                    type="password"
                    label="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="********"
                />

                <InputField
                    type="password"
                    label="Confirme a Senha"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="********"
                />
                <div style={{ marginTop: '20px' }}>
                    <Button type="submit"> 
                        Cadastrar
                    </Button>
                </div> 
            </form>
            
            <p style={{ marginTop: '20px' }}>
                Já tem conta? <Link to="/">Faça Login</Link>
            </p>
        </div>
    );
};

export default RegisterScreen;