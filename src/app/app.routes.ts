import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    // Ensure this points to 'login' so the app starts there
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    // Add your main task page here later
    { path: '**', redirectTo: 'login' }
];