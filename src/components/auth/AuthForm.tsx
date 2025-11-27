import React, {useState} from 'react';
import InputField from '../ui/InputField';
import Button from '../ui/Button';
import authController from '../../controllers/authController';

const AuthForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        let loginResult = authController.loginUser(email, password);
        if (loginResult){
            alert("Login successful!");
            window.location.href = '/';
        } else {
            alert("Invalid email or password.");
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Entre na sua conta !</h2>
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
        </form>

    )

}

export default AuthForm