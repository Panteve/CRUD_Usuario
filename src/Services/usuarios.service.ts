import { Inject, Injectable } from '@nestjs/common';
import { ActualizarUsuarioDto } from 'src/DTOs/actualizar-usuario.dto';
import { CrearUsuarioDto } from 'src/DTOs/crear-usuario.dto';
import { UsuarioResponseDto } from 'src/DTOs/response-usuario.dto';
import { Usuario } from 'src/Entities/usuario.entity';
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
    return this.usuarioRepository
      .obtenerTodos()
      .then((usuarios) => usuarios.map((usuario) => this.mapear(usuario)));
  }

  async obtenerPorId(id: number) {
    const usuario = await this.usuarioRepository.obtenerPorId(id);
    return usuario ? this.mapear(usuario) : null;
  }

  async crear(usuario: CrearUsuarioDto) {
    const existingUser = await this.usuarioRepository.obtenerPorCorreo(
      usuario.Correo,
    );
    if (existingUser) {
      throw new Error('El correo ya está registrado.');
    }
    const nuevoUsuario = Object.assign(new Usuario(), usuario);
    const usuarioCreado = await this.usuarioRepository.crear(nuevoUsuario);
    return this.mapear(usuarioCreado);
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

  private mapear(usuario: Usuario): UsuarioResponseDto {
    return {
      Id: usuario.Id,
      Nombre: usuario.Nombre,
      Correo: usuario.Correo,
      Telefono: usuario.Telefono,
      Activo: usuario.Activo,
    };
  }
}
