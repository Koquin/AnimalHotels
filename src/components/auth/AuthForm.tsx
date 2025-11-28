import React, {useState} from 'react';
import InputField from '../ui/InputField';
import Button from '../ui/Button';
import authController from '../../controllers/authController';
import { useNavigate, Link } from 'react-router-dom'; 

const AuthForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent) => {
        console.log(`Passando pelo arquivo AuthForm, metodo handleSubmit, com as variaveis: email=${email}, password=***`);
        event.preventDefault();
        setError('');

        const loginResult = await authController.loginUser(email, password);
        console.log(`O metodo handleSubmit do arquivo AuthForm vai retornar: success=${loginResult.success}`);

        if (loginResult.success) {
            alert("Login bem-sucedido!");
            navigate('/dashboard');
        } else {
            setError(loginResult.message);
            alert(`Erro: ${loginResult.message}`);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Entre na sua conta !</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <InputField
            type="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="seuemail@exemplo.com"
            />

            <InputField
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="*****"
            />
        <Button type="submit"> 
            Entrar
        </Button>

        <p style={{ marginTop: '15px' }}>
                Não tem uma conta? <Link to="/register">Cadastre-se aqui</Link>
            </p>
        </form>

    )

}

export default AuthForm