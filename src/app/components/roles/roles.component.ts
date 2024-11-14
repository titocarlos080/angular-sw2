import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importar módulos comunes
import { RolService } from '../../services/rol.service';
import { FormsModule } from '@angular/forms';
 
@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [CommonModule,FormsModule], // Módulos necesarios
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {
  roles: any[] = [];
  errorMessage: string = '';
  successMessage: string = '';
  nuevoRol: string = '';  // Nuevo nombre del rol para crear o editar
  roleIdToEdit: string | null = null;  // ID del rol que se está editando

  constructor(private rolService: RolService) {}

  ngOnInit(): void {
    this.loadRoles();
  }

  // Método para cargar los roles desde el servicio
  loadRoles() {
    this.rolService.getAllRoles().subscribe({
      next: (result) => {
        this.roles = result?.data?.getAllRoles || [];
      },
      error: (error) => {
        this.errorMessage = 'Error al obtener los roles';
        console.error(error);
      }
    });
  }

  // Crear un nuevo rol
  createRol() {
    if (this.nuevoRol.trim()) {
      this.rolService.createRol(this.nuevoRol).subscribe({
        next: (result) => {
          console.log('Rol creado exitosamente:', result);
          this.successMessage = 'Rol creado exitosamente';
          this.loadRoles();  // Recargar los roles
          this.nuevoRol = '';  // Limpiar el campo de entrada
        },
        error: (error) => {
          this.errorMessage = 'Error al crear el rol';
          console.error(error);
        }
      });
    } else {
      this.errorMessage = 'El nombre del rol no puede estar vacío';
    }
  }

  // Editar un rol existente
  editRol(id: string, nombre: string) {
    this.roleIdToEdit = id;
    this.nuevoRol = nombre;  // Asignar el nombre del rol a la variable de edición
  }

  // Actualizar un rol
  updateRol() {
    if (this.roleIdToEdit && this.nuevoRol.trim()) {
      this.rolService.updateRol(this.roleIdToEdit, this.nuevoRol).subscribe({
        next: (result) => {
          console.log('Rol actualizado exitosamente:', result);
          this.successMessage = 'Rol actualizado exitosamente';
          this.loadRoles();  // Recargar los roles
          this.clearForm();
        },
        error: (error) => {
          this.errorMessage = 'Error al actualizar el rol';
          console.error(error);
        }
      });
    } else {
      this.errorMessage = 'El nombre del rol no puede estar vacío';
    }
  }

  // Eliminar un rol
  deleteRol(id: string) {
    this.rolService.deleteRol(id).subscribe({
      next: () => {
        this.successMessage = 'Rol eliminado exitosamente';
        this.loadRoles();  // Recargar los roles
      },
      error: (error) => {
        this.errorMessage = 'Error al eliminar el rol';
        console.error(error);
      }
    });
  }

  // Limpiar el formulario (para la edición o creación de rol)
  clearForm() {
    this.nuevoRol = '';
    this.roleIdToEdit = null;
    this.successMessage = '';
    this.errorMessage = '';
  }
}
