import { Inject, Injectable } from '@nestjs/common';
import { ActualizarUsuarioDto } from 'src/DTOs/actualizar-usuario.dto';
import { CrearUsuarioDto } from 'src/DTOs/crear-usuario.dto';
import { IUsuarioService } from 'src/Interfaces/service-usuario.interface';
import { USUARIO_REPOSITORY } from 'src/Interfaces/repository-usuario.interface';
import type { IUsuarioRepository } from 'src/Interfaces/repository-usuario.interface';

@Injectable()
export class UsuariosService implements IUsuarioService {
  constructor(
    @Inject(USUARIO_REPOSITORY)
    private readonly usuarioRepository: IUsuarioRepository,
  ) {}

  obtenerTodos() {
    return this.usuarioRepository.obtenerTodos();
  }

  async obtenerPorId(id: number) {
    const usuario = await this.usuarioRepository.obtenerPorId(id);
    return usuario ? usuario : null;
  }

  async crear(usuario: CrearUsuarioDto) {
    const existingUser = await this.usuarioRepository.obternerPorCorreo(
      usuario.Correo,
    );
    if (existingUser) {
      throw new Error('El correo ya está registrado.');
    }
    return this.usuarioRepository.crear(usuario);
  }

  async actualizar(id: number, usuario: ActualizarUsuarioDto) {
    const existingUser = await this.usuarioRepository.obtenerPorId(id);
    if (!existingUser) return false;
    Object.assign(existingUser, usuario);
    const updatedUser = await this.usuarioRepository.actualizar(existingUser);
    return updatedUser;
  }

  async eliminar(id: number) {
    const existingUser = await this.usuarioRepository.obtenerPorId(id);
    if (!existingUser) return false;
    const deletedUser = await this.usuarioRepository.eliminar(existingUser);
    return deletedUser;
  }
}
