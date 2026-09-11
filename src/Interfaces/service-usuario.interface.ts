import { ActualizarUsuarioDto } from 'src/DTOs/actualizar-usuario.dto';
import { CrearUsuarioDto } from 'src/DTOs/crear-usuario.dto';
import { Usuario } from 'src/Entities/usuario.entity';

export interface IUsuarioService {
  obtenerTodos(): Promise<Usuario[]>;
  obtenerPorId(id: number): Promise<Usuario | null>;
  crear(usuario: CrearUsuarioDto): Promise<Usuario>;
  actualizar(
    id: number,
    usuario: ActualizarUsuarioDto,
  ): Promise<boolean | null>;
  eliminar(id: number): Promise<boolean>;
}
