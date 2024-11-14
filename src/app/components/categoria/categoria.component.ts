import { Component, OnInit } from '@angular/core';
import { Categoria } from '../../models/categoria.model';
import { FormsModule } from '@angular/forms';  // Importar FormsModule para usar ngModel
import { CommonModule } from '@angular/common';  // Importar CommonModule para directivas comunes
import { CategoriaService } from '../../services/categoria.service';  // Asegúrate de importar el servicio

@Component({
  selector: 'app-categoria',
  standalone: true,  // Marca el componente como independiente
  imports: [FormsModule, CommonModule],  // Importa los módulos necesarios
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {
  categorias: Categoria[] = [];
  nuevaCategoria: string = '';
  categoriaSeleccionada: Categoria | null = null;
  mensaje: string = '';

  constructor(private categoriaService: CategoriaService) { }

  ngOnInit(): void {
    this.obtenerCategorias();
  }

  obtenerCategorias(): void {
    this.categoriaService.getAllCategorias().subscribe({
      next: (response: any) => {
        this.categorias = response.data.getAllCategorias;  // Asegúrate de acceder a la propiedad 'data'
        this.mensaje = 'Categorías cargadas correctamente';
      },
      error: () => {
        this.mensaje = 'Error al cargar categorías';
      }
    });
  }

  crearCategoria(): void {
    if (!this.nuevaCategoria.trim()) {
      this.mensaje = 'El nombre de la categoría no puede estar vacío';
      return;
    }

    this.categoriaService.createCategoria(this.nuevaCategoria).subscribe({
      next: (categoria) => {
        this.categorias.push(categoria);  // Añadir la nueva categoría a la lista
        this.nuevaCategoria = '';  // Limpiar el campo de texto
        this.mensaje = 'Categoría creada exitosamente';
      },
      error: () => {
        this.mensaje = 'Error al crear la categoría';
      }
    });
    this.obtenerCategorias();
  }

  seleccionarCategoria(categoria: Categoria): void {
    this.categoriaSeleccionada = { ...categoria };
  }

  actualizarCategoria(): void {
    if (!this.categoriaSeleccionada || !this.categoriaSeleccionada.nombre.trim()) {
      this.mensaje = 'El nombre de la categoría no puede estar vacío';
      return;
    }

    this.categoriaService.updateCategoria(this.categoriaSeleccionada.id, this.categoriaSeleccionada.nombre).subscribe({
      next: (categoriaActualizada) => {
        const index = this.categorias.findIndex(cat => cat.id === categoriaActualizada.id);
        if (index !== -1) {
          this.categorias[index] = categoriaActualizada;  // Actualizar la categoría en la lista
        }
        this.categoriaSeleccionada = null;  // Limpiar la categoría seleccionada
        this.mensaje = 'Categoría actualizada correctamente';
      },
      error: () => {
        this.mensaje = 'Error al actualizar la categoría';
      }
    });
  }

  eliminarCategoria(id: string): void {
    this.categoriaService.deleteCategoria(id).subscribe({
      next: () => {
        this.categorias = this.categorias.filter(c => c.id !== id);  // Eliminar de la lista
        this.mensaje = 'Categoría eliminada correctamente';
      },
      error: () => {
        this.mensaje = 'Error al eliminar la categoría';
      }
    });
    this.obtenerCategorias();
  }
}
