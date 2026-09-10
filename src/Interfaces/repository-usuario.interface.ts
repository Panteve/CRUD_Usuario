import { Usuario } from 'src/Entities/usuario.entity';

export interface IUsuarioRepository {
  obtenerTodos(): Promise<Usuario[]>;
  obtenerPorId(id: number): Promise<Usuario | null>;
  obternerPorCorreo(correo: string): Promise<Usuario | null>;
  crear(usuario: Usuario): Promise<Usuario>;
  actualizar(usuario: Usuario): Promise<boolean | null>;
  eliminar(usuario: Usuario): Promise<boolean>;
}
