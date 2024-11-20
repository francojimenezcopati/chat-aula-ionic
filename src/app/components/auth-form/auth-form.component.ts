import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    FormBuilder,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import {
    AlertController,
    IonItem,
    IonInput,
    IonInputPasswordToggle,
    IonButton,
    IonNote,
    IonGrid,
    IonRow,
    IonCol,
} from '@ionic/angular/standalone';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-auth-form',
    standalone: true,
    templateUrl: './auth-form.component.html',
    styleUrls: ['./auth-form.component.scss'],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        IonInput,
        IonItem,
        IonInputPasswordToggle,
        IonButton,
        IonNote,
        IonGrid,
        IonRow,
        IonCol,
    ],
})
export class AuthFormComponent {
    credentials: FormGroup;

    constructor(
        private authService: AuthService,
        private router: Router,
        private fb: FormBuilder,
        private alertController: AlertController
    ) {
        this.credentials = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
        });
    }

    get email() {
        return this.credentials.get('email');
    }

    get password() {
        return this.credentials.get('password');
    }

    public async login() {
        const user = await this.authService.login(
            this.email?.value,
            this.password?.value
        );

        if (user) {
            console.log('¡Inicio de sesión exitoso!');
            this.router.navigateByUrl('/home', { replaceUrl: true });
        } else {
            this.showAlert(
                'Error de Inicio de Sesión',
                '¡Por favor, inténtalo de nuevo!'
            );
        }
    }

    private async showAlert(header: string, message: string) {
        const alert = await this.alertController.create({
            header,
            message,
            buttons: ['OK'],
            cssClass: 'custom-alert-class',
        });
        await alert.present();
    }

    public fillInGuest(guest: '1' | '2' | '3') {
        if (guest === '1') {
            this.credentials.setValue({
                email: 'guest1@guest.com',
                password: 'guest1',
            });
        } else if (guest === '2') {
            this.credentials.setValue({
                email: 'guest2@guest.com',
                password: 'guest2',
            });
        } else {
            this.credentials.setValue({
                email: 'guest3@guest.com',
                password: 'guest3',
            });
        }
    }
}
