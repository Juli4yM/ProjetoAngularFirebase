
import { MessageService } from './message.service';
import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, sendSignInLinkToEmail, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})

export class AuthenticateService {
    duration: number = 2000;
    message: string = 'Erro inesperado';
    isLoading = false;

    constructor( 
        public auth: Auth,
        private _message: MessageService,
        private _router: Router,
    ) { }
    
    /*
    * @description: Registra um novo usuário
    * @param email: string
    * @param password: string
    * @return: Promise<any>
    * */
    public async register(email: string, password: string): Promise<boolean> {
        this.isLoading = true;

        createUserWithEmailAndPassword(this.auth, email, password)
        .then(() => {
            this._message.show('Conta criada com sucesso! Realize o Login!');
            this._router.navigate(['/login']).then(() => {
                // Recarrega a página para garantir que os dados de login sejam carregados corretamente
                window.location.reload();
              });
        })
        .catch((_: any) => {
            this.showErro(_, email, password);
        })
        .finally(() => {
            this.isLoading = false;
        });

        return true;
    };


    
    public async verify(email: string): Promise<any> {
        this.isLoading = true;

        const actionCodeSettings = {
            // URL you want to redirect back to. The domain (www.example.com) for this
            // URL must be in the authorized domains list in the Firebase Console.
            url: 'https://localhost/home',
            // This must be true.
            handleCodeInApp: true,
          };

        sendSignInLinkToEmail(this.auth, email, actionCodeSettings)
        .then(() => {
            // The link was successfully sent. Inform the user.
            // Save the email locally so you don't need to ask the user for it again
            // if they open the link on the same device.
            this._message.show('email enviado');

            // window.localStorage.setItem('emailForSignIn', email);
            // ...
        })
        .catch((_: any) => {
            console.log(_);
        })
        .finally(() => {
            this.isLoading = false;
        });

        return true;
    };


    /*
    * @description: Efetua login usando o firebase
    * @param email: string
    * @param password: string
    * @return: Promise<any>
    * */
    public async login(email: string, password: string): Promise<boolean>{
        this.isLoading = true;

        signInWithEmailAndPassword(this.auth, email, password)
        .then((response: any) => {
            localStorage.setItem('user', JSON.stringify(response.user));

            this._message.show('Login Realizado com Sucesso!');
            this._router.navigate(['/home']).then(() => {
                // Recarrega a página para garantir que os dados de login sejam carregados corretamente
                window.location.reload();
              });
        })
        .catch((_: any) => {
            this.showErro(_, email, password);
        })
        .finally(() => {
            this.isLoading = false;
        });

        return true;
    }

    getUserData() {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    }

    // Método para logout
    logout() {
        localStorage.removeItem('user');
        this._router.navigate(['/login']);
    }

    
    /*
    * @description: Chame essa função para redirecionar um usuário para outra página
    * @param page: string
    * */
    redirectTo(page: string){
        this._router.navigate([page]);
    }

    /*
    * @description: Exibe a mensagem de erro
    * @param error: any response from firebase
    * @param email: string
    */
    showErro(_: any, email: string, password: string){
        if (_.code == 'auth/too-many-requests') this.message = 'Você realizou muitas tentativas de login. Tente novamente mais tarde.';
        if (_.code == 'auth/user-not-found') this.message = 'Usuário não encontrado.';
        if (_.code == 'auth/wrong-password') this.message = 'Senha incorreta.';
        if (_.code == 'auth/weak-password') this.message = 'A senha deve conter no mínimo 6 caracteres.';
        if (_.code == 'auth/email-already-in-use') this.message = 'Este e-mail já está em uso.';
        if (_.code == 'auth/missing-email') this.message = 'E-mail não informado.';
        if (!!!email) this.message = 'Preencha o e-mail.';
        if (!!!password) this.message = 'Preencha a senha com 6 caracteres.';
        this._message.show(this.message, this.duration);
    }

}