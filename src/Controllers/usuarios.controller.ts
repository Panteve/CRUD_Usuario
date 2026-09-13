import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ActualizarUsuarioDto } from 'src/DTOs/actualizar-usuario.dto';
import { BuscarPorCorreoParamDto } from 'src/DTOs/buscar-por-correo-param.dto';
import { BuscarPorNombreParamDto } from 'src/DTOs/buscar-por-nombre-param.dto';
import { CrearUsuarioDto } from 'src/DTOs/crear-usuario.dto';
import { USUARIO_SERVICE } from 'src/Interfaces/service-usuario.interface';
import type { IUsuarioService } from 'src/Interfaces/service-usuario.interface';

@Controller('usuarios')
export class UsuariosController {
  constructor(
    @Inject(USUARIO_SERVICE)
    private readonly usuariosService: IUsuarioService,
  ) {}
  @Get()
  async obtenerTodos() {
    return await this.usuariosService.obtenerTodos();
  }

  @Get('nombre/:nombre')
  async buscarPorNombre(@Param() params: BuscarPorNombreParamDto) {
    return await this.usuariosService.buscarPorNombre(params.nombre);
  }

  @Get('correo/:correo')
  async buscarPorCorreo(@Param() params: BuscarPorCorreoParamDto) {
    return await this.usuariosService.buscarPorCorreo(params.correo);
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
  async obtenerPorId(@Param('id', ParseIntPipe) id: number) {
    const usuario = await this.usuariosService.obtenerPorId(id);
    if (!usuario) {
      throw new NotFoundException('Usuario no encontrado.');
    }
    return usuario;
  }

  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async actualizar(
    @Param('id', ParseIntPipe) id: number,
    @Body() usuario: ActualizarUsuarioDto,
  ): Promise<void> {
    const actualizado = await this.usuariosService.actualizar(id, usuario);
    if (!actualizado) {
      throw new NotFoundException('Usuario no encontrado.');
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async eliminar(@Param('id', ParseIntPipe) id: number): Promise<void> {
    const eliminado = await this.usuariosService.eliminar(id);
    if (!eliminado) {
      throw new NotFoundException('Usuario no encontrado.');
    }
  }
}
