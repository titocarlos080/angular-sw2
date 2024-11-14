import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { RolService } from '../../services/rol.service';
import { Rol } from '../../models/roles.model';
import { Usuario } from '../../models/usuario.model';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [MatPaginator,MatTableModule  ,NgIf],
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit, AfterViewInit {
  usuarios: Usuario[] = [];
  showForm: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';
  nuevoUsuario = this.getUsuarioVacio();
  roles: Rol[] = [];
  dataSource = new MatTableDataSource<any>(this.usuarios);  
  displayedColumns: string[] = ['user', 'nombre', 'correo', 'acciones'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private usuarioService: UsuarioService, private rolesService: RolService) {}

  ngOnInit(): void {
    this.loadUsuarios();
    this.loadRoles();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadUsuarios() {
    this.usuarioService.getAllUsuarios().subscribe({
      next: (result) => {
        this.usuarios = result.data.getAllUsuarios;
        this.dataSource.data = this.usuarios;
      },
      error: (err) => this.handleError('Error al obtener los usuarios', err)
    });
  }

  loadRoles() {
    this.rolesService.getAllRoles().subscribe({
      next: (result) => this.roles = result.data.getAllRoles,
      error: (err) => this.handleError('Error al obtener los roles', err)
    });
  }

  handleError(message: string, error: any) {
    this.errorMessage = message;
    console.error(message, error);
  }

  toggleForm() {
    this.showForm = !this.showForm;
    if (!this.showForm) this.resetForm();
  }

  resetForm() {
    this.nuevoUsuario = this.getUsuarioVacio();
  }

  getUsuarioVacio() {
    return {
      user: '', password: '', nombre: '', apellidos: '', sexo: '', fnac: '', telefono: '', correo: '', rol: '', fotoPath: '', especialidad: ''
    };
  }

  private guardarUsuario(usuario: any, esEdicion: boolean) {
    const serviceCall = esEdicion
      ? this.usuarioService.updateUsuario(
          usuario.user, 
          usuario.password, 
          usuario.nombre, 
          usuario.apellidos, 
          usuario.sexo, 
          usuario.fnac, 
          usuario.telefono, 
          usuario.correo, 
          usuario.rol, 
          usuario.fotoPath, 
          usuario.especialidad
        )
      : this.usuarioService.createUsuario(
          usuario.user, 
          usuario.password, 
          usuario.nombre, 
          usuario.apellidos, 
          usuario.sexo, 
          usuario.fnac, 
          usuario.telefono, 
          usuario.correo, 
          usuario.rol, 
          usuario.fotoPath, 
          usuario.especialidad
        );
  
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
  
  crearUsuario() {
    this.guardarUsuario(this.nuevoUsuario, false);
  }

  editarUsuario(usuario: Usuario) {
    this.nuevoUsuario = { ...usuario };
    this.toggleForm();
  }

  eliminarUsuario(userId: string) {
    this.usuarioService.deleteUsuario(userId).subscribe({
      next: () => {
        this.usuarios = this.usuarios.filter(usuario => usuario.user !== userId);
        this.dataSource.data = [...this.usuarios];
        this.successMessage = 'Usuario eliminado exitosamente.';
      },
      error: (err) => this.handleError('Error al eliminar el usuario', err)
    });
  }
}
