import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsDateString,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePedidoDto {
  @ApiProperty({ example: 'Av. Siempre Viva 123' })
  @IsNotEmpty()
  @IsString()
  direccion_entrega!: string;

  @ApiProperty({
    example: 'tarjeta',
    description: 'Metodo de pago (tarjeta, efectivo, transferencia, etc.)',
  })
  @IsNotEmpty()
  @IsString()
  metodo_pago!: string;

  @ApiPropertyOptional({ example: '2026-07-19T18:00:00.000Z' })
  @IsOptional()
  @IsDateString()
  fecha_entrega_estimada?: string;
}
