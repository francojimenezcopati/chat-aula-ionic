import { inject, Injectable, signal } from '@angular/core';
import {
    Auth,
    signInWithEmailAndPassword,
    signOut,
    User,
} from '@angular/fire/auth';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    auth = inject(Auth);
    currentUserSig = signal<User | null | undefined>(undefined);

    constructor() {
        // Suscribirse a los cambios en el estado de autenticación
        this.auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                this.currentUserSig.set(authUser);
            } else {
                this.currentUserSig.set(null);
            }
        });
    }

    // Inicio de sesión
    public async login(email: string, password: string) {
        const promise = signInWithEmailAndPassword(this.auth, email, password);
        // promise.then((credentials) => {
        //     this.createUser(credentials.user);
        // });
        return promise;
    }

    // Cierre de sesión
    logout() {
        return signOut(this.auth);
    }
}
