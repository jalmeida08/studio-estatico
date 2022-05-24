export class Login {
    email: string;
    senha: string;
    grant_type: string
    scope: string;
    
    constructor(email: string, senha: string){
        this.email = email;
        this.senha = senha;
        this.grant_type = 'password';
        this.scope = "web"
    }
}