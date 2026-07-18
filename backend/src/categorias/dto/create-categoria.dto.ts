import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCategoriaDto {
  @ApiProperty({ example: 'Lácteos' })
  @IsNotEmpty()
  @IsString()
  nombre!: string;

  @ApiPropertyOptional({ example: 'Productos lácteos y derivados' })
  @IsOptional()
  @IsString()
  descripcion?: string;
}
