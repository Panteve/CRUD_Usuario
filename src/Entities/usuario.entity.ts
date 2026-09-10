import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column()
  Nombre: string;

  @Column()
  Correo: string;

  @Column()
  Telefono: string;

  @Column()
  FechaCreacion: Date;

  @Column({ default: true })
  Activo: boolean;
}
