import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import { gql } from 'apollo-angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  constructor(private apollo: Apollo) { }

  // Método para obtener todos los usuarios
  getAllUsuarios(): Observable<any> {
    const GET_ALL_USUARIOS = gql`
      query {
        getAllUsuarios {
          id
          user
          nombre
          correo
        }
      }
    `;

    return this.apollo.watchQuery<any>({
      query: GET_ALL_USUARIOS,
    }).valueChanges;
  }

  // Método para obtener un usuario por ID
  getUsuarioById(id: string): Observable<any> {
    const GET_USUARIO_BY_ID = gql`
      query getUsuarioById($id: String!) {
        getUsuarioById(user: $id) {
          id
          user
          nombre
          correo
        }
      }
    `;

    return this.apollo.watchQuery<any>({
      query: GET_USUARIO_BY_ID,
      variables: { id },
    }).valueChanges;
  }

  // Método para crear un nuevo usuario
  createUsuario(user: string, password: string, nombre: string, apellidos: string, sexo: string, fnac: string, telefono: string, correo: string, rol: string, fotoPath: string, especialidad: string, token: string): Observable<any> {
    const CREATE_USUARIO = gql`
      mutation createUsuario(  $user: String!,$password: String!,$nombre: String!,$apellidos: String!, $sexo: String!,$fnac: String!,
        $telefono: String!,
        $correo: String!,
        $rol: String!,
        $fotoPath: String!,
        $especialidad: String!,
        $token: String!
      ) {
        createUsuario(
          user: $user,
          password: $password,
          nombre: $nombre,
          apellidos: $apellidos,
          sexo: $sexo,
          fnac: $fnac,
          telefono: $telefono,
          correo: $correo,
          rol: $rol,
          fotoPath: $fotoPath,
          especialidad: $especialidad,
         ) {
          id
          user
          nombre
          correo
        }
      }
    `;

    return this.apollo.mutate({
      mutation: CREATE_USUARIO,
      variables: {
        user, password, nombre, apellidos, sexo, fnac, telefono, correo, rol, fotoPath, especialidad, token
      }
    }) as Observable<any>;
  }

  // Método para actualizar un usuario
  updateUsuario(user: string, password: string, nombre: string, apellidos: string, sexo: string, fnac: string, telefono: string, correo: string, rol: string, fotoPath: string, especialidad: string, token: string): Observable<any> {
    const UPDATE_USUARIO = gql`
      mutation updateUsuario(
        $user: String!,
        $password: String!,
        $nombre: String!,
        $apellidos: String!,
        $sexo: String!,
        $fnac: String!,
        $telefono: String!,
        $correo: String!,
        $rol: String!,
        $fotoPath: String!,
        $especialidad: String!,
      ) {
        updateUsuario(
          user: $user,
          password: $password,
          nombre: $nombre,
          apellidos: $apellidos,
          sexo: $sexo,
          fnac: $fnac,
          telefono: $telefono,
          correo: $correo,
          rol: $rol,
          fotoPath: $fotoPath,
          especialidad: $especialidad,
        ) {
          user
          nombre
          correo
        }
      }
    `;

    return this.apollo.mutate({
      mutation: UPDATE_USUARIO,
      variables: {
        user, password, nombre, apellidos, sexo, fnac, telefono, correo, rol, fotoPath, especialidad, token
      }
    }) as Observable<any>;
  }

  // Método para eliminar un usuario
  deleteUsuario(user: string): Observable<any> {
    const DELETE_USUARIO = gql`
      mutation deleteUsuario($user: String!) {
        deleteUsuario(user: $user)
      }
    `;

    return this.apollo.mutate({
      mutation: DELETE_USUARIO,
      variables: { user },
    });
  }
}
