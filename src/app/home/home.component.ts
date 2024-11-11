import { Component } from '@angular/core';
import { LoginComponent } from "../components/login/login.component";
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [LoginComponent,RouterLink,NgIf],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
       isLoggedIn: boolean = true;  // Cambiar según el estado de autenticación}
}