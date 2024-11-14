import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';

// Definimos las consultas y mutaciones de GraphQL
const GET_ALL_CATEGORIAS = gql`
  query {
    getAllCategorias {
      id
      nombre
    }
  }
`;

const GET_CATEGORIA_BY_ID = gql`
  query getCategoriaById($id: ID!) {
    getCategoriaById(id: $id) {
      id
      nombre
    }
  }
`;

const CREATE_CATEGORIA = gql`
  mutation createCategoria($nombre: String!) {
    createCategoria(nombre: $nombre) {
      id
      nombre
    }
  }
`;

const UPDATE_CATEGORIA = gql`
  mutation updateCategoria($id: ID!, $nombre: String!) {
    updateCategoria(id: $id, nombre: $nombre) {
      id
      nombre
    }
  }
`;

const DELETE_CATEGORIA = gql`
  mutation deleteCategoria($id: ID!) {
    deleteCategoria(id: $id)
  }
`;

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  constructor(private apollo: Apollo) {}

  // Obtener todas las categorías
  getAllCategorias(): Observable<any> {
    return this.apollo.watchQuery({
      query: GET_ALL_CATEGORIAS,
    }).valueChanges;
  }

  // Obtener una categoría por ID
  getCategoriaById(id: string): Observable<any> {
    return this.apollo.watchQuery({
      query: GET_CATEGORIA_BY_ID,
      variables: {
        id,
      },
    }).valueChanges;
  }

  // Crear una nueva categoría
  createCategoria(nombre: string): Observable<any> {
    return this.apollo.mutate({
      mutation: CREATE_CATEGORIA,
      variables: {
        nombre,
      },
    });
  }

  // Actualizar una categoría
  updateCategoria(id: string, nombre: string): Observable<any> {
    return this.apollo.mutate({
      mutation: UPDATE_CATEGORIA,
      variables: {
        id,
        nombre,
      },
    });
  }

  // Eliminar una categoría
  deleteCategoria(id: string): Observable<any> {
    return this.apollo.mutate({
      mutation: DELETE_CATEGORIA,
      variables: {
        id,
      },
    });
  }
}
