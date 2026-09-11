import { Module } from '@nestjs/common';
import { UsuariosService } from '../Services/usuarios.service';
import { UsuariosController } from 'src/Controllers/usuarios.controller';
import { UsuarioRepository } from 'src/Repositories/usuario.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from 'src/Entities/usuario.entity';
import { USUARIO_REPOSITORY } from 'src/Interfaces/repository-usuario.interface';

@Module({
  controllers: [UsuariosController],
  providers: [
    UsuariosService,
    UsuarioRepository,
    { provide: USUARIO_REPOSITORY, useExisting: UsuarioRepository },
  ],
  imports: [TypeOrmModule.forFeature([Usuario])],
})
export class UsuariosModule {}
