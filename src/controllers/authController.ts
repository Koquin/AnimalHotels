interface LoginResponse {
    success: boolean;
    token?: string;
    message: string;
}

interface RegisterResponse {
    success: boolean;
    message: string;
}

const TOKEN_KEY = 'auth_token';

class authController {
    private saveToken(token: string): void {
        console.log('Passando pelo arquivo authController, metodo saveToken, com as variaveis: token=***');
        localStorage.setItem(TOKEN_KEY, token);
        console.log('O metodo saveToken do arquivo authController vai retornar: <void>');
    }

    private getToken(): string | null {
        console.log('Passando pelo arquivo authController, metodo getToken, com as variaveis: <none>');
        const token = localStorage.getItem(TOKEN_KEY);
        console.log(`O metodo getToken do arquivo authController vai retornar: ${token ? '***' : 'null'}`);
        return token;
    }

    private removeToken(): void {
        console.log('Passando pelo arquivo authController, metodo removeToken, com as variaveis: <none>');
        localStorage.removeItem(TOKEN_KEY);
        console.log('O metodo removeToken do arquivo authController vai retornar: <void>');
    }
    private apiBase(): string {
        console.log('Passando pelo arquivo authController, metodo apiBase, com as variaveis: <none>');
        const result = (import.meta.env.VITE_API_URL as string) || 'http://localhost:8000';
        console.log(`O metodo apiBase do arquivo authController vai retornar: ${result}`);
        return result;
    }

    async loginUser(email: string, password: string): Promise<LoginResponse> {
        console.log(`Passando pelo arquivo authController, metodo loginUser, com as variaveis: email=${email}, password=***`);
        try {
            const res = await fetch(`${this.apiBase()}/api/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();
            if (!res.ok) {
                const result = { success: false, message: data.message || 'Erro no login' };
                console.log(`O metodo loginUser do arquivo authController vai retornar: ${JSON.stringify(result)}`);
                return result;
            }
            if (data.token) {
                this.saveToken(data.token);
            }
            const result = { success: true, token: data.token, message: data.message };
            console.log(`O metodo loginUser do arquivo authController vai retornar: ${JSON.stringify(result)}`);
            return result;
        } catch (err) {
            console.error('Erro ao conectar com backend de auth:', err);
            const result = { success: false, message: 'Erro de conexão com servidor de autenticação' };
            console.log(`O metodo loginUser do arquivo authController vai retornar: ${JSON.stringify(result)}`);
            return result;
        }
    }

    async registerUser(name: string, email: string, password: string): Promise<RegisterResponse> {
        console.log(`Passando pelo arquivo authController, metodo registerUser, com as variaveis: name=${name}, email=${email}, password=***`);
        try {
            const res = await fetch(`${this.apiBase()}/api/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password })
            });
            const data = await res.json();
            if (!res.ok) {
                const result = { success: false, message: data.message || 'Erro no cadastro' };
                console.log(`O metodo registerUser do arquivo authController vai retornar: ${JSON.stringify(result)}`);
                return result;
            }
            if (data.token) {
                this.saveToken(data.token);
            }
            const result = { success: true, message: data.message };
            console.log(`O metodo registerUser do arquivo authController vai retornar: ${JSON.stringify(result)}`);
            return result;
        } catch (err) {
            console.error('Erro ao conectar com backend de registro:', err);
            const result = { success: false, message: 'Erro de conexão com servidor de autenticação' };
            console.log(`O metodo registerUser do arquivo authController vai retornar: ${JSON.stringify(result)}`);
            return result;
        }
    }

    async validateToken(token?: string): Promise<boolean> {
        // Se nenhum token foi passado, tenta recuperar do localStorage
        const tokenToValidate = token || this.getToken();
        console.log(`Passando pelo arquivo authController, metodo validateToken, com as variaveis: token=${tokenToValidate ? '***' : 'undefined'}`);
        try {
            const headers: Record<string,string> = { 'Content-Type': 'application/json' };
            if (tokenToValidate) headers['Authorization'] = `Bearer ${tokenToValidate}`;
            const res = await fetch(`${this.apiBase()}/api/verify`, {
                method: 'POST',
                headers,
                body: JSON.stringify({ token: tokenToValidate })
            });
            const data = await res.json();
            const result = res.ok && data.success === true;
            console.log(`O metodo validateToken do arquivo authController vai retornar: ${result}`);
            return result;
        } catch (err) {
            console.error('Erro ao validar token com backend:', err);
            console.log(`O metodo validateToken do arquivo authController vai retornar: false`);
            return false;
        }
    }

    async logout(): Promise<boolean> {
        console.log('Passando pelo arquivo authController, metodo logout, com as variaveis: <none>');
        try {
            const res = await fetch(`${this.apiBase()}/api/logout`, { method: 'POST', credentials: 'include' });
            if (res.ok) {
                this.removeToken();
            }
            const result = res.ok;
            console.log(`O metodo logout do arquivo authController vai retornar: ${result}`);
            return result;
        } catch (err) {
            console.error('Erro ao chamar logout no backend:', err);
            console.log('O metodo logout do arquivo authController vai retornar: false');
            return false;
        }
    }
}

export default new authController();