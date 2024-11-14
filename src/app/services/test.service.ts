import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { Test } from '../models/test.model';
  
@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private apollo: Apollo) {}

  // Obtener todos los test
  getAllTests(): Observable<any> {
    const GET_ALL_TESTS = gql`
      query {
        getAllTests {
         id
          nombre
          fecha
          estado
          observaciones
          calificacion
          usuarioId
          categoriaId
        }
      }
    `;
    return this.apollo.watchQuery<any>({
      query: GET_ALL_TESTS
    }).valueChanges;
  }

  // Obtener un test por ID
  getTestById(id: string): Observable<any> {
    const GET_TEST_BY_ID = gql`
      query getTestById($id: String!) {
        getTestById(id: $id) {
          id
          nombre
          fecha
          estado
          observaciones
          calificacion
          usuarioId
          categoriaId
        }
      }
    `;
    return this.apollo.watchQuery<any>({
      query: GET_TEST_BY_ID,
      variables: { id }
    }).valueChanges;
  }

  // Crear un nuevo test
  createTest(test: Partial<Test>): Observable<any> {
    const CREATE_TEST = gql`
      mutation createTest(
        $nombre: String!,
        $fecha: String!,
        $estado: String!,
        $observaciones: String,
        $calificacion: Int,
        $usuarioId: String!,
        $categoriaId: String!
      ) {
        createTest(
          nombre: $nombre,
          fecha: $fecha,
          estado: $estado,
          observaciones: $observaciones,
          calificacion: $calificacion,
          usuarioId: $usuarioId,
          categoriaId: $categoriaId
        ) {
          id
          nombre
          fecha
          estado
          observaciones
          calificacion
          categoriaId
           usuarioId
        }
      }
    `;
    return this.apollo.mutate({
      mutation: CREATE_TEST,
      variables: { 
        nombre: test.nombre,
        fecha: test.fecha,
        estado: test.estado,
        observaciones: test.observaciones,
        calificacion: test.calificacion,
        usuarioId: test.usuarioId,
        categoriaId: test.categoriaId
      }
    });
  }

  // Actualizar un test existente
  updateTest(id: string, test: Partial<Test>): Observable<any> {
    const UPDATE_TEST = gql`
      mutation updateTest(
        $id: String!,
        $nombre: String!,
        $fecha: String!,
        $estado: String!,
        $observaciones: String,
        $calificacion: Int,
        $usuarioId: String!,
        $categoriaId: String!
      ) {
        updateTest(
          id: $id,
          nombre: $nombre,
          fecha: $fecha,
          estado: $estado,
          observaciones: $observaciones,
          calificacion: $calificacion,
          usuarioId: $usuarioId,
          categoriaId: $categoriaId
        ) {
          id
          nombre
          fecha
          estado
          observaciones
          calificacion
          usuarioId
          categoriaId
        }
      }
    `;
    return this.apollo.mutate({
      mutation: UPDATE_TEST,
      variables: { 
        id,
        nombre: test.nombre,
        fecha: test.fecha,
        estado: test.estado,
        observaciones: test.observaciones,
        calificacion: test.calificacion,
        usuarioId: test.usuarioId,
        categoriaId: test.categoriaId
      }
    });
  }

  // Eliminar un test
  deleteTest(id: string): Observable<any> {
    alert("Hola")
    const DELETE_TEST = gql`
      mutation deleteTest($id: String!) {
        deleteTest(id: $id)
      }
    `;
    return this.apollo.mutate({
      mutation: DELETE_TEST,
      variables: { id }
    });
  }
}
