class authController {
    loginUser(email: string, password: string): boolean {
        if (email === 'iago@gmail.com' && password === 'senha') {
            return true;
        }
        return false;
    }
}
export default new authController;