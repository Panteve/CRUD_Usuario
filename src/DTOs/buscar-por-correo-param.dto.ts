import { Transform } from 'class-transformer';
import { IsEmail, MaxLength } from 'class-validator';

export class BuscarPorCorreoParamDto {
  @IsEmail()
  @MaxLength(100)
  @Transform(({ value }) => value?.trim())
  correo: string;
}
