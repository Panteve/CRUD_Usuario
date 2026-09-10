import { Module } from '@nestjs/common';
import { UsuariosService } from '../Services/usuarios.service';
import { UsuariosController } from 'src/Controllers/usuarios.controller';

@Module({
  controllers: [UsuariosController],
  providers: [UsuariosService],
})
export class UsuariosModule {}
