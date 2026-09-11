import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from 'src/Entities/usuario.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsuarioRepository {
  constructor(
    @InjectRepository(Usuario)
    private readonly repository: Repository<Usuario>,
  ) {}

  obtenerTodos(): Promise<Usuario[]> {
    return this.repository.find();
  }

  obtenerPorId(id: number): Promise<Usuario | null> {
    return this.repository.findOneBy({ Id: id });
  }

  obtenerPorCorreo(correo: string): Promise<Usuario | null> {
    return this.repository.findOneBy({ Correo: correo });
  }

  crear(usuario: Usuario): Promise<Usuario> {
    return this.repository.save(usuario);
  }

  async actualizar(usuario: Usuario): Promise<void> {
    await this.repository.save(usuario);
  }

  async eliminar(usuario: Usuario): Promise<void> {
    await this.repository.remove(usuario);
  }
}
