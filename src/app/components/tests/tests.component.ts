import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Test } from '../../models/test.model';
import { TestService } from '../../services/test.service';
import { Usuario } from '../../models/usuario.model';
import { Categoria } from '../../models/categoria.model';
import { UsuarioService } from '../../services/usuario.service';
import { CategoriaService } from '../../services/categoria.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tests',
  standalone: true,
  imports: [CommonModule, FormsModule, NgIf, MatTableModule, MatPaginatorModule, MatProgressSpinnerModule],
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.css']
})
export class TestsComponent implements OnInit {
  cargando: Boolean = false
  tests: Test[] = [];
  testSeleccionado: Test | null = null;
  nuevoTest: Partial<Test> = {};
  mensaje: string = '';
  usuarios: Usuario[] = [];
  categorias: Categoria[] = [];
  showForm: boolean = false; // Toggle for showing/hiding the form
  displayedColumns: string[] = ['nombre', 'fecha', 'estado', 'usuario', 'categoria', 'calificacion', 'acciones'];
  dataSource = new MatTableDataSource<any>(this.tests);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    private testService: TestService,
    private usuarioService: UsuarioService,
    private categoriaService: CategoriaService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.obtenerTests();
    this.obtenerUsuarios();
    this.obtenerCategorias();
  }
  toggleForm(): void {
    this.showForm = !this.showForm;
  }
  // Obtener todos los tests
  obtenerTests(): void {
    this.cargando = true;
    this.testService.getAllTests().subscribe({
      next: (response) => {
        this.tests = response.data.getAllTests;
        this.dataSource.data = this.tests;  // Update dataSource with loaded tests
        this.dataSource.paginator = this.paginator; // Assign paginator after setting data
      },
      error: (error) => {
        this.mensaje = 'Error al obtener los tests';
        console.error(error);
      }
    });
    this.cargando = false;
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
          this.nuevoTest = {};  // Limpiar el formulario
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

  realizarCertificado(certificadoId: string): void {
    const testCertificado = this.tests.find(test => test.id === certificadoId);

    if (testCertificado) {
      // Obtain the user and category names
      const usuarioNombre = this.getUsuarioNombre(testCertificado.usuarioId);
      const categoriaNombre = this.getCategoriaNombre(testCertificado.categoriaId);

      // Construct the prompt with specific details for a professional appearance
      // Construct the prompt with clear and specific details in English
          const prompt = `Generate an official medical certificate with the following details:
          - Title: "Unique Health Certificate"
          - Patient Name: ${usuarioNombre}
          - Diagnosis: ${testCertificado.estado}
          - Category: ${categoriaNombre}
          - This certificate should have a professional and official design, with clear formatting. It should include a signature line and date at the bottom.`;

// Send the prompt to the API


      // Send the prompt to the API

      // Make a GET request to the Flask API
      this.http.get<any>(`http://localhost:5000/generar/certificado?promp=${encodeURIComponent(prompt)}`)
        .subscribe({
          next: (response) => {
            // Handle the response
            const { image_url } = response;

            // Display the certificate message with the image URL
            alert(`Certificado de Test\n\nUsuario: ${usuarioNombre}\nCategoría: ${categoriaNombre}\nEstado: ${testCertificado.estado}\nObservación: ${testCertificado.observaciones}\nURL de la imagen: ${image_url}`);
          },
          error: (error) => {
            console.error('Error al generar certificado:', error);
            alert('No se pudo generar el certificado.');
          }
        });
    } else {
      console.error('Certificado no encontrado');
      alert('No se ha encontrado el certificado con el ID proporcionado.');
    }
  }




}

