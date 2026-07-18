import {
  IsNumber,
  Min,
  Max,
  IsDateString,
  IsOptional,
  IsString,
  IsInt,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateOfertaDto {
  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsInt()
  producto_id?: number;

  @ApiPropertyOptional({ example: 25.0 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  porcentaje_descuento?: number;

  @ApiPropertyOptional({ example: '2026-07-18T12:00:00.000Z' })
  @IsOptional()
  @IsDateString()
  fecha_inicio?: string;

  @ApiPropertyOptional({ example: '2026-07-28T12:00:00.000Z' })
  @IsOptional()
  @IsDateString()
  fecha_fin?: string;

  @ApiPropertyOptional({ example: 'inactiva' })
  @IsOptional()
  @IsString()
  estado?: string;
}
