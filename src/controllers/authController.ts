interface User {
    email: string;
    password: string;
    name: string;
}
const simulatedUsers: User[] = [
    { email: 'iago@gmail.com', password: 'senha', name: 'Iago Tutor' }
];

class authController {
    
    loginUser(email: string, password: string): boolean {
        const user = simulatedUsers.find(u => u.email === email && u.password === password);
        
        if (user) {
            console.log(`Login bem-sucedido para: ${email}`);
            return true;
        }
        
        console.log(`Falha no login para: ${email}`);
        return false;
    }

    registerUser(name: string, email: string, password: string): boolean {
        const userExists = simulatedUsers.some(u => u.email === email);
        if (userExists) {
            console.log(`Falha no cadastro: O e-mail ${email} já está em uso.`);
            return false; 
        }
        const newUser: User = { name, email, password };
        simulatedUsers.push(newUser);
        
        console.log(`Cadastro bem-sucedido (simulado) para: ${name} (${email})`);
        return true; 
    }
}
export default new authController();