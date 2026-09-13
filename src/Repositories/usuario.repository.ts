import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from 'src/Entities/usuario.entity';
import { IUsuarioRepository } from 'src/Interfaces/repository-usuario.interface';
import { Repository } from 'typeorm';

@Injectable()
export class UsuarioRepository implements IUsuarioRepository {
  constructor(
    @InjectRepository(Usuario)
    private readonly repository: Repository<Usuario>,
  ) {}
  obtenerPorCorreo(correo: string): Promise<Usuario | null> {
    return this.repository.findOneBy({ Correo: correo, Activo: true });
  }

  obtenerTodos(): Promise<Usuario[]> {
    return this.repository.findBy({ Activo: true });
  }

  async buscarPorNombre(nombre: string): Promise<Usuario | null> {
    return await this.repository.findOneBy({ Nombre: nombre, Activo: true });
  }

  async buscarPorCorreo(correo: string): Promise<Usuario | null> {
    return await this.repository.findOneBy({ Correo: correo, Activo: true });
  }

  obtenerPorId(id: number): Promise<Usuario | null> {
    return this.repository.findOneBy({ Id: id, Activo: true });
  }

  crear(usuario: Usuario): Promise<Usuario> {
    return this.repository.save(usuario);
  }

  async actualizar(usuario: Usuario): Promise<boolean | null> {
    const savedUsuario = await this.repository.save(usuario);
    return savedUsuario ? true : null;
  }

  async eliminar(usuario: Usuario): Promise<boolean> {
    usuario.Activo = false;
    const usuarioActualizado = await this.repository.save(usuario);
    return Boolean(usuarioActualizado);
  }
}
