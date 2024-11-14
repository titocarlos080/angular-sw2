import { Injectable } from "@angular/core";
import { Apollo, gql } from "apollo-angular";
import { Observable } from "rxjs";

// Definir las consultas y mutaciones GraphQL
const GET_ALL_ROLES = gql`
  query {
    getAllRoles {
      id
      nombre
    }
  }
`;

const GET_ROL_BY_ID = gql`
  query getRolById($id: String!) {
    getRolById(id: $id) {
      id
      nombre
    }
  }
`;

const CREATE_ROL = gql`
  mutation createRol($nombre: String!) {
    createRol(nombre: $nombre) {
      id
      nombre
    }
  }
`;

const UPDATE_ROL = gql`
  mutation updateRol($id: String!, $nombre: String!) {
    updateRol(id: $id, nombre: $nombre) {
      id
      nombre
    }
  }
`;

const DELETE_ROL = gql`
  mutation deleteRol($id: String!) {
    deleteRol(id: $id)
  }
`;

@Injectable({
  providedIn: 'root',
})
export class RolService {
  constructor(private apollo: Apollo) {}

  // Método para obtener todos los roles
  getAllRoles(): Observable<any> {
    return this.apollo.watchQuery({
      query: GET_ALL_ROLES,
    }).valueChanges;
  }

  // Método para obtener un rol por ID
  getRolById(id: string): Observable<any> {
    return this.apollo.watchQuery({
      query: GET_ROL_BY_ID,
      variables: { id },
    }).valueChanges;
  }

  // Método para crear un nuevo rol
  createRol(nombre: string): Observable<any> {
    return this.apollo.mutate({
      mutation: CREATE_ROL,
      variables: { nombre },
    });
  }

  // Método para actualizar un rol existente
  updateRol(id: string, nombre: string): Observable<any> {
    return this.apollo.mutate({
      mutation: UPDATE_ROL,
      variables: { id, nombre },
    });
  }

  // Método para eliminar un rol
  deleteRol(id: string): Observable<any> {
    return this.apollo.mutate({
      mutation: DELETE_ROL,
      variables: { id },
    });
  }
}
