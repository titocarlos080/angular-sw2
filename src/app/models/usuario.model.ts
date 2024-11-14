import { Test } from "./test.model";

export interface Usuario {
    id: string;              // MongoDB _id
    user: string;            // Nombre de usuario
    password: string;        // Contraseña
    nombre: string;          // Nombre del usuario
    apellidos: string;       // Apellidos del usuario
    sexo: string;            // Sexo del usuario
    fnac: string;            // Fecha de nacimiento
    telefono: string;        // Teléfono del usuario
    correo: string;          // Correo electrónico
    rol: string;             // Rol del usuario
    fotoPath: string;        // Ruta de la foto del usuario
    especialidad: string;    // Especialidad del usuario
  
    tests: Test[];           // Lista de objetos de tipo Test asociados al usuario
  }
  

  