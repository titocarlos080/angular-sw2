 
export interface Test {
    id: string;
    nombre: string;
    fecha: string;
    estado: string;
    observaciones?: string;
    calificacion?: number;
    usuarioId: string;
    categoriaId: string;
  }