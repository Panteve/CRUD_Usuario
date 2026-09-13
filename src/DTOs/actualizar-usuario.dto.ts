import { IsBoolean, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class ActualizarUsuarioDto {
  @IsString()
  @IsNotEmpty()
  Nombre: string;

  @IsEmail()
  @IsNotEmpty()
  Correo: string;

  @IsString()
  @IsNotEmpty()
  Telefono: string;

  @IsBoolean()
  Activo: boolean;
}
