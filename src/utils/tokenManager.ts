// Gerenciador de JWT Token
const TOKEN_KEY = 'auth_token';

export class TokenManager {
  /**
   * Armazena o token no localStorage
   */
  static setToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
  }

  /**
   * Recupera o token do localStorage
   */
  static getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  /**
   * Remove o token (logout)
   */
  static removeToken(): void {
    localStorage.removeItem(TOKEN_KEY);
  }

  /**
   * Verifica se existe um token válido
   */
  static isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;

    try {
      // Decodifica o token (sem validar a assinatura no frontend)
      // Em produção, você deveria validar no backend
      const parts = token.split('.');
      if (parts.length !== 3) return false;

      const payload = JSON.parse(atob(parts[1]));
      
      // Verifica se o token expirou
      if (payload.exp && Date.now() >= payload.exp * 1000) {
        this.removeToken();
        return false;
      }

      return true;
    } catch (error) {
      console.error('Erro ao validar token:', error);
      return false;
    }
  }

  /**
   * Retorna os dados decodificados do token
   */
  static getTokenData(): Record<string, any> | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const parts = token.split('.');
      const payload = JSON.parse(atob(parts[1]));
      return payload;
    } catch (error) {
      console.error('Erro ao decodificar token:', error);
      return null;
    }
  }

  /**
   * Retorna o email do usuário logado
   */
  static getUserEmail(): string | null {
    const data = this.getTokenData();
    return data?.email || null;
  }
}

export default TokenManager;
