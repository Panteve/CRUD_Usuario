import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsuariosService } from '../Services/usuarios.service';
import { CrearUsuarioDto } from 'src/DTOs/crear-usuario.dto';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}
  @Get()
  async obtenerTodos() {
    return await this.usuariosService.obtenerTodos();
  }
  @Post()
  async crear(@Body() usuario: CrearUsuarioDto) {
    return await this.usuariosService.crear(usuario);
  }
}
