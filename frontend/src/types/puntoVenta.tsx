export type Usuarios = {
  idusuario?: number | undefined;
  documento: string;
  nombrecompleto: string;
  correo: string;
  clave: string;
  rol: Rol;
  estado: number;
  fecharegistro: string;
};

type Rol = {
  idrol?: number;
  descripcion: string;
  fecharegistro?: string;
};

