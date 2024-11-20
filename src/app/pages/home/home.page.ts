import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButton,
    IonIcon,
} from '@ionic/angular/standalone';
import { AuthService } from 'src/app/services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
    standalone: true,
    imports: [
        IonIcon,
        IonButton,
        IonContent,
        IonHeader,
        IonTitle,
        IonToolbar,
        CommonModule,
        FormsModule,
        RouterLink,
    ],
})
export class HomePage {
    router = inject(Router);
    constructor(private authService: AuthService) {}

    onBtnClick(aula: string) {
        localStorage.setItem('aula', aula);
        this.router.navigateByUrl(`/chat/${aula}`);
    }

    logout() {
        this.authService.logout();
        this.router.navigateByUrl('');
    }
}
