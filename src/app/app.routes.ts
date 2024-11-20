import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'home',
        loadComponent: () =>
            import('./pages/home/home.page').then((m) => m.HomePage),
    },
    {
        path: 'chat',
        children: [
            {
                path: '4A',
                loadComponent: () =>
                    import('./chat/chat-page/chat-page.component').then(
                        (m) => m.ChatPageComponent
                    ),
            },
            {
                path: '4B',
                loadComponent: () =>
                    import('./chat/chat-page/chat-page.component').then(
                        (m) => m.ChatPageComponent
                    ),
            },
        ],
    },
    {
        path: '',
        redirectTo: 'auth',
        pathMatch: 'full',
    },
    {
        path: 'auth',
        loadComponent: () =>
            import('./pages/auth/auth.page').then((m) => m.AuthPage),
    },
];
