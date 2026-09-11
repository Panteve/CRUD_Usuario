import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ActualizarUsuarioDto } from 'src/DTOs/actualizar-usuario.dto';
import { CrearUsuarioDto } from 'src/DTOs/crear-usuario.dto';
import { Usuario } from 'src/Entities/usuario.entity';
import { IUsuarioRepository } from 'src/Interfaces/repository-usuario.interface';
import { Repository } from 'typeorm';

@Injectable()
export class UsuarioRepository implements IUsuarioRepository {
  constructor(
    @InjectRepository(Usuario)
    private readonly repository: Repository<Usuario>,
  ) {}
  obternerPorCorreo(correo: string): Promise<Usuario | null> {
    return this.repository.findOneBy({ Correo: correo });
  }

  obtenerTodos(): Promise<Usuario[]> {
    return this.repository.find();
  }

  obtenerPorId(id: number): Promise<Usuario | null> {
    return this.repository.findOneBy({ Id: id });
  }

  obtenerPorCorreo(correo: string): Promise<Usuario | null> {
    return this.repository.findOneBy({ Correo: correo });
  }

  crear(usuario: CrearUsuarioDto): Promise<Usuario> {
    return this.repository.save(usuario);
  }

  async actualizar(usuario: ActualizarUsuarioDto): Promise<boolean | null> {
    const savedUsuario = await this.repository.save(usuario);
    return savedUsuario ? true : null;
  }

  async eliminar(usuario: Usuario): Promise<boolean> {
    const removedUsuario = await this.repository.remove(usuario);
    return removedUsuario ? true : false;
  }
}
