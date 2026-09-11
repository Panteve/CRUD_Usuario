import { Injectable } from '@nestjs/common';
import { ActualizarUsuarioDto } from 'src/DTOs/actualizar-usuario.dto';
import { CrearUsuarioDto } from 'src/DTOs/crear-usuario.dto';
import { IUsuarioService } from 'src/Interfaces/service-usuario.interface';
import { UsuarioRepository } from 'src/Repositories/usuario.repository';

@Injectable()
export class UsuariosService implements IUsuarioService {
  constructor(private readonly usuarioRepository: UsuarioRepository) {}

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
    const updatedUser = await this.usuarioRepository.actualizar(usuario);
    return updatedUser;
  }

  async eliminar(id: number) {
    const existingUser = await this.usuarioRepository.obtenerPorId(id);
    if (!existingUser) return false;
    const deletedUser = await this.usuarioRepository.eliminar(existingUser);
    return deletedUser;
  }
}
