import { Component, OnInit } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Test } from '../../models/test.model';
import { TestService } from '../../services/test.service';
import { Usuario } from '../../models/usuario.model';
import { Categoria } from '../../models/categoria.model';
import { UsuarioService } from '../../services/usuario.service';
import { CategoriaService } from '../../services/categoria.service';

@Component({
  selector: 'app-tests',
  standalone: true,
  imports: [CommonModule, FormsModule, NgIf],
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.css']
})
export class TestsComponent implements OnInit {
  tests: Test[] = [];
  testSeleccionado: Test | null = null;
  nuevoTest: Partial<Test> = {};
  mensaje: string = '';
  usuarios: Usuario[] = [];
  categorias: Categoria[] = [];

  constructor(
    private testService: TestService,
    private usuarioService: UsuarioService,
    private categoriaService: CategoriaService
  ) { }

  ngOnInit(): void {
    this.obtenerTests();
    this.obtenerUsuarios();
    this.obtenerCategorias();
  }

  // Obtener todos los tests
  obtenerTests(): void {
    this.testService.getAllTests().subscribe({
      next: (response) => {
        this.tests = response.data.getAllTests;
      },
      error: (error) => {
        this.mensaje = 'Error al obtener los tests';
        console.error(error);
      }
    });
  }

  // Obtener todos los usuarios
  obtenerUsuarios(): void {
    this.usuarioService.getAllUsuarios().subscribe({
      next: (response) => {
        this.usuarios = response.data.getAllUsuarios;
      },
      error: (error) => {
        this.mensaje = 'Error al obtener los usuarios';
        console.error(error);
      }
    });
  }

  // Obtener todas las categorías
  obtenerCategorias(): void {
    this.categoriaService.getAllCategorias().subscribe({
      next: (response) => {
        this.categorias = response.data.getAllCategorias;
      },
      error: (error) => {
        this.mensaje = 'Error al obtener las categorías';
        console.error(error);
      }
    });
  }

  // Crear un nuevo test
  crearTest(): void {
    console.log('Datos de nuevoTest:', this.nuevoTest); // Verifica los datos capturados
    if (
      this.nuevoTest.nombre &&
      this.nuevoTest.fecha &&
      this.nuevoTest.estado &&
      this.nuevoTest.usuarioId &&
      this.nuevoTest.categoriaId
    ) {
      // Convierte usuarioId y categoriaId a strings explícitamente
      const nuevoTestData = {
        ...this.nuevoTest,
        usuarioId: this.nuevoTest.usuarioId as string,
        categoriaId: this.nuevoTest.categoriaId as string
      };
  
      this.testService.createTest(nuevoTestData).subscribe({
        next: (response) => {
          this.tests.push(response.data.createTest);
          this.mensaje = 'Test creado correctamente';
          this.nuevoTest = { };  // Limpiar el formulario
        },
        error: (error) => {
          this.mensaje = 'Error al crear el test';
          console.error(error);
        }
      });
    } else {
      this.mensaje = 'Por favor complete todos los campos';
    }
  }
  

  // Seleccionar un test para editar
  seleccionarTest(test: Test): void {
    this.testSeleccionado = { ...test };  // Clon del test seleccionado
  }

  // Actualizar un test
  actualizarTest(): void {
    if (this.testSeleccionado) {

      console.log(this.testSeleccionado);

      this.testService.updateTest(this.testSeleccionado.id, this.testSeleccionado).subscribe({
        next: (response) => {
          const index = this.tests.findIndex(t => t.id === response.data.updateTest.id);
          if (index !== -1) {
            this.tests[index] = response.data.updateTest;
            this.mensaje = 'Test actualizado correctamente';
          }
          this.testSeleccionado = null;  // Limpiar selección
        },
        error: (error) => {
          this.mensaje = 'Error al actualizar el test';
          console.error(error);
        }
      });
    }
  }

  // Eliminar un test
  eliminarTest(id: string): void {
    this.testService.deleteTest(id).subscribe({
      next: () => {
        this.tests = this.tests.filter(t => t.id !== id);
        this.mensaje = 'Test eliminado correctamente';
      },
      error: (error) => {
        this.mensaje = 'Error al eliminar el test';
        console.error(error);
      }
    });
  }

  // Obtener el nombre del usuario
  getUsuarioNombre(usuarioId: string): string {
    const usuario = this.usuarios.find(u => u.id === usuarioId);
    return usuario ? usuario.nombre : 'Sin usuario';
  }

  // Obtener el nombre de la categoría
  getCategoriaNombre(categoriaId: string): string {
    const categoria = this.categorias.find(c => c.id === categoriaId);
    return categoria ? categoria.nombre : 'Sin categoría';
  }
}
