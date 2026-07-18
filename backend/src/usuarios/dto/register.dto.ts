import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: 'Ana' })
  @IsNotEmpty()
  nombre!: string;

  @ApiProperty({ example: 'Perez' })
  @IsNotEmpty()
  apellido!: string;

  @ApiProperty({ example: 'ana@test.com' })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: '123456', minLength: 6 })
  @MinLength(6)
  password!: string;

  @ApiPropertyOptional({ example: '987654321' })
  telefono?: string;

  @ApiPropertyOptional({ example: 'Av. Siempre Viva 123' })
  direccion?: string;
}
