import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsuariosService } from '../Services/usuarios.service';
import { ActualizarUsuarioDto } from 'src/DTOs/actualizar-usuario.dto';
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
    try {
      return await this.usuariosService.crear(usuario);
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw error;
    }
  }

  @Get(':id')
  async obtenerPorId(@Param('id') id: number) {
    const usuario = await this.usuariosService.obtenerPorId(id);
    if (!usuario) {
      throw new NotFoundException('Usuario no encontrado.');
    }
    return usuario;
  }

  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async actualizar(
    @Param('id') id: number,
    @Body() usuario: ActualizarUsuarioDto,
  ): Promise<void> {
    const actualizado = await this.usuariosService.actualizar(id, usuario);
    if (!actualizado) {
      throw new NotFoundException('Usuario no encontrado.');
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async eliminar(@Param('id') id: number): Promise<void> {
    const eliminado = await this.usuariosService.eliminar(id);
    if (!eliminado) {
      throw new NotFoundException('Usuario no encontrado.');
    }
  }
}
