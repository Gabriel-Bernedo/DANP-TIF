import { IsNotEmpty, IsString, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePedidoEstadoDto {
  @ApiProperty({ example: 'en_camino', description: 'Nuevo estado del pedido' })
  @IsNotEmpty()
  @IsString()
  @IsIn(['pendiente', 'en_camino', 'entregado', 'cancelado'])
  estado!: string;
}
