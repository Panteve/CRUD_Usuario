import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CrearUsuarioDto {
  @IsString()
  @IsNotEmpty()
  Nombre: string;

  @IsEmail()
  @IsNotEmpty()
  Correo: string;

  @IsString()
  @IsNotEmpty()
  Telefono: string;
}
