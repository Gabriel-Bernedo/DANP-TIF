import {
  IsNotEmpty,
  IsNumber,
  Min,
  Max,
  IsDateString,
  IsOptional,
  IsString,
  IsInt,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateOfertaDto {
  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsInt()
  producto_id!: number;

  @ApiProperty({
    example: 20.0,
    description: 'Porcentaje de descuento de 0 a 100',
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(100)
  porcentaje_descuento!: number;

  @ApiProperty({ example: '2026-07-18T12:00:00.000Z' })
  @IsNotEmpty()
  @IsDateString()
  fecha_inicio!: string;

  @ApiProperty({ example: '2026-07-25T12:00:00.000Z' })
  @IsNotEmpty()
  @IsDateString()
  fecha_fin!: string;

  @ApiPropertyOptional({ example: 'activa' })
  @IsOptional()
  @IsString()
  estado?: string;
}
