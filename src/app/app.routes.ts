import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { BusinessIntelligenceComponent } from './components/business-intelligence/business-intelligence.component';
import { TestsComponent } from './components/tests/tests.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },  // Ruta por defecto redirige a 'home'
    { path: 'home', component: HomeComponent },            // Ruta para Home
    { path: 'login', component: LoginComponent },          // Ruta para Login
    { path: 'usuarios', component: UsuariosComponent },
    { path: 'tests', component: TestsComponent },
    { path: 'business-intelligence', component: BusinessIntelligenceComponent },
    { path: 'login', component: LoginComponent },
    // { path: 'logout', component: LogoutComponent },
    { path: '**', component: PageNotFoundComponent }       // Ruta para manejar páginas no encontradas
];
