import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RolService } from '../../services/rol.service';
import { Rol } from '../../models/roles.model';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  usuarios: any[] = [];
  showForm: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';
  nuevoUsuario = this.getUsuarioVacio();
  roles:  Rol[] = [];  // Lista de roles disponibles

  constructor(private usuarioService: UsuarioService ,private rolesService:RolService) { }

  ngOnInit(): void {
    this.loadUsuarios();
    this.loadRoles();
  }

  // Cargar la lista de usuarios
  loadUsuarios() {
    this.usuarioService.getAllUsuarios().subscribe({
      next: (result) => {
        this.usuarios = result.data.getAllUsuarios;
      },
      error: (err) => {
        this.handleError('Error al obtener los usuarios', err);
      }
    });
  }

  // Cargar la lista de roles para el combo box
  loadRoles() {
    this.rolesService.getAllRoles().subscribe({
      next: (result) => {
        this.roles = result.data.getAllRoles;
         
      },
      error: (err) => {
        this.handleError('Error al obtener los roles', err);
      }
    });
  }

  // Manejar errores
  private handleError(message: string, error: any) {
    this.errorMessage = message;
    console.error(message, error);
  }

  // Cambiar la visibilidad del formulario
  toggleForm() {
    this.showForm = !this.showForm;
    if (!this.showForm) {
      this.resetForm();
    }
  }

  // Restablecer el formulario
  private resetForm() {
    this.nuevoUsuario = this.getUsuarioVacio();
  }

  // Obtener un objeto de usuario vacío
  private getUsuarioVacio() {
    return {
      user: '',
      password: '',
      nombre: '',
      apellidos: '',
      sexo: '',
      fnac: '',
      telefono: '',
      correo: '',
      rol: '',
      fotoPath: '',
      especialidad: '',
      token: ''
    };
  }

  // Guardar un usuario (crear o actualizar)
  private guardarUsuario(usuario: any, esEdicion: boolean) {
    const serviceCall = esEdicion
      ? this.usuarioService.updateUsuario(usuario.user, usuario.password, usuario.nombre, usuario.apellidos, usuario.sexo,
        usuario.fnac, usuario.telefono, usuario.correo, usuario.rol, usuario.fotoPath, usuario.especialidad, usuario.token)
      : this.usuarioService.createUsuario(usuario.user, usuario.password, usuario.nombre, usuario.apellidos, usuario.sexo,
        usuario.fnac, usuario.telefono, usuario.correo, usuario.rol, usuario.fotoPath, usuario.especialidad, usuario.token);

    serviceCall.subscribe({
      next: (usuarioGuardado) => {
        if (esEdicion) {
          const index = this.usuarios.findIndex(u => u.user === usuarioGuardado.user);
          if (index !== -1) {
            this.usuarios[index] = usuarioGuardado;
          }
        } else {
          this.usuarios.push(usuarioGuardado);
        }

        this.successMessage = esEdicion ? 'Usuario actualizado exitosamente.' : 'Usuario creado exitosamente.';
        this.errorMessage = '';
        this.resetForm();
        this.toggleForm();
      },
      error: (err) => {
        this.handleError(esEdicion ? 'Error al actualizar el usuario' : 'Error al crear el usuario', err);
      }
    });
  }

  // Crear un nuevo usuario
  crearUsuario() {
    this.guardarUsuario(this.nuevoUsuario, false);
  }

  // Editar un usuario
  editarUsuario(usuario: any) {
    this.nuevoUsuario = { ...usuario };
    this.toggleForm();
  }

  // Eliminar un usuario
  eliminarUsuario(userId: string) {
    this.usuarioService.deleteUsuario(userId).subscribe({
      next: () => {
        this.usuarios = this.usuarios.filter(usuario => usuario.user !== userId);
        this.successMessage = 'Usuario eliminado exitosamente.';
        this.errorMessage = '';
      },
      error: (err) => {
        this.handleError('Error al eliminar el usuario', err);
      }
    });
  }
}
