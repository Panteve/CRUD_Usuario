import { ActualizarUsuarioDto } from 'src/DTOs/actualizar-usuario.dto';
import { CrearUsuarioDto } from 'src/DTOs/crear-usuario.dto';
import { UsuarioResponseDto } from 'src/DTOs/response-usuario.dto';

export const USUARIO_SERVICE = Symbol('USUARIO_SERVICE');

export interface IUsuarioService {
  obtenerTodos(): Promise<UsuarioResponseDto[]>;
  buscarPorNombre(nombre: string): Promise<UsuarioResponseDto | null>;
  buscarPorCorreo(correo: string): Promise<UsuarioResponseDto | null>;
  obtenerPorId(id: number): Promise<UsuarioResponseDto | null>;
  crear(usuario: CrearUsuarioDto): Promise<UsuarioResponseDto>;
  actualizar(
    id: number,
    usuario: ActualizarUsuarioDto,
  ): Promise<boolean | null>;
  eliminar(id: number): Promise<boolean>;
}
