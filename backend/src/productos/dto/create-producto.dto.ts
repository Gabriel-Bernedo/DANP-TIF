import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsNumber,
  Min,
  IsInt,
  IsDateString,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProductoDto {
  @ApiProperty({ example: 'Leche Descremada 1L' })
  @IsNotEmpty()
  @IsString()
  nombre!: string;

  @ApiPropertyOptional({ example: 'Leche descremada pasteurizada de 1 litro' })
  @IsOptional()
  @IsString()
  descripcion?: string;

  @ApiProperty({ example: 4.5 })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  precio_original!: number;

  @ApiPropertyOptional({ example: 2.25 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  precio_descuento?: number;

  @ApiProperty({ example: 20 })
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  cantidad_disponible!: number;

  @ApiProperty({ example: '2026-08-30T00:00:00.000Z' })
  @IsNotEmpty()
  @IsDateString()
  fecha_vencimiento!: string;

  @ApiPropertyOptional({ example: 'https://imagenes.com/leche.jpg' })
  @IsOptional()
  @IsString()
  imagen_url?: string;

  @ApiPropertyOptional({ example: 'disponible' })
  @IsOptional()
  @IsString()
  estado?: string;

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsInt()
  categoria_id!: number;
}
