import { Injectable } from '@nestjs/common';
import type { IUsuarioRepository } from 'src/Interfaces/repository-usuario.interface';
import { IUsuarioService } from 'src/Interfaces/service-usuario.interface';

@Injectable()
export class UsuariosService implements IUsuarioService {
  constructor(private readonly usuarioRepository: IUsuarioRepository) {}

  obtenerTodos() {
    return this.usuarioRepository.obtenerTodos();
  }

  obtenerPorId(id: number) {
    return this.usuarioRepository.obtenerPorId(id);
  }

  crear(usuario: any) {
    return this.usuarioRepository.crear(usuario);
  }

  actualizar(id: number, usuario: any) {
    return this.usuarioRepository.actualizar(id, usuario);
  }

  eliminar(id: number) {
    return this.usuarioRepository.eliminar(id);
  }
}
