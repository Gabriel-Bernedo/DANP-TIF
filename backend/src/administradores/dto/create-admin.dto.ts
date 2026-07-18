import { IsEmail, IsNotEmpty, MinLength, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateAdminDto {
  @ApiProperty({ example: 'Carlos' })
  @IsNotEmpty()
  nombre!: string;

  @ApiProperty({ example: 'carlos@test.com' })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: 'admin123', minLength: 6 })
  @MinLength(6)
  password!: string;

  @ApiPropertyOptional({ example: 'gestor_productos' })
  @IsOptional()
  rol?: string;
}
