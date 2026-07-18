import { IsString, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateCategoriaDto {
  @ApiPropertyOptional({ example: 'Lácteos y Quesos' })
  @IsOptional()
  @IsString()
  nombre?: string;

  @ApiPropertyOptional({ example: 'Productos lácteos, quesos y similares' })
  @IsOptional()
  @IsString()
  descripcion?: string;
}
