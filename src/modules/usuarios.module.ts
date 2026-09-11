import { Module } from '@nestjs/common';
import { UsuariosService } from '../Services/usuarios.service';
import { UsuariosController } from 'src/Controllers/usuarios.controller';
import { UsuarioRepository } from 'src/Repositories/usuario.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from 'src/Entities/usuario.entity';

@Module({
  controllers: [UsuariosController],
  providers: [UsuariosService, UsuarioRepository],
  imports: [TypeOrmModule.forFeature([Usuario])],
})
export class UsuariosModule {}
