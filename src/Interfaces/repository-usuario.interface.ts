import { Usuario } from 'src/Entities/usuario.entity';

export const USUARIO_REPOSITORY = Symbol('USUARIO_REPOSITORY');

export interface IUsuarioRepository {
  obtenerTodos(): Promise<Usuario[]>;
  buscarPorNombre(nombre: string): Promise<Usuario | null>;
  obtenerPorId(id: number): Promise<Usuario | null>;
  buscarPorCorreo(correo: string): Promise<Usuario | null>;
  crear(usuario: Usuario): Promise<Usuario>;
  actualizar(usuario: Usuario): Promise<boolean | null>;
  eliminar(usuario: Usuario): Promise<boolean>;
}
