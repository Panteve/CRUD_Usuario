import { CrearUsuarioDto } from 'src/DTOs/crear-usuario.dto';
import { Usuario } from 'src/Entities/usuario.entity';

export const USUARIO_REPOSITORY = Symbol('USUARIO_REPOSITORY');

export interface IUsuarioRepository {
  obtenerTodos(): Promise<Usuario[]>;
  obtenerPorId(id: number): Promise<Usuario | null>;
  obternerPorCorreo(correo: string): Promise<Usuario | null>;
  crear(usuario: CrearUsuarioDto): Promise<Usuario>;
  actualizar(usuario: Usuario): Promise<boolean | null>;
  eliminar(usuario: Usuario): Promise<boolean>;
}
