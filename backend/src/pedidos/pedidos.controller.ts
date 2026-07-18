import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  Req,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { PedidosService } from './pedidos.service';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoEstadoDto } from './dto/update-pedido-estado.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

interface RequestWithUser {
  user: {
    userId: number;
    email: string;
    role: string;
  };
}

@ApiTags('pedidos')
@Controller('pedidos')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
export class PedidosController {
  constructor(private pedidosService: PedidosService) {}

  @Post()
  @Roles('cliente')
  @ApiOperation({
    summary: 'Crear un pedido a partir del carrito de compras activo',
  })
  @ApiResponse({ status: 201, description: 'Pedido creado exitosamente' })
  create(@Req() req: RequestWithUser, @Body() dto: CreatePedidoDto) {
    const usuarioId = req.user.userId;
    return this.pedidosService.create(usuarioId, dto);
  }

  @Get('mis-pedidos')
  @Roles('cliente')
  @ApiOperation({ summary: 'Listar pedidos del cliente autenticado' })
  findMisPedidos(@Req() req: RequestWithUser) {
    const usuarioId = req.user.userId;
    return this.pedidosService.findMisPedidos(usuarioId);
  }

  @Get()
  @Roles('admin')
  @ApiOperation({
    summary: 'Listar todos los pedidos registrados en el sistema (Admin)',
  })
  findAll() {
    return this.pedidosService.findAll();
  }

  @Get(':id')
  @Roles('admin', 'cliente')
  @ApiOperation({ summary: 'Obtener detalles de un pedido por ID' })
  findOne(@Req() req: RequestWithUser, @Param('id', ParseIntPipe) id: number) {
    const usuarioId = req.user.userId;
    const role = req.user.role;
    return this.pedidosService.findOne(id, usuarioId, role);
  }

  @Patch(':id/estado')
  @Roles('admin')
  @ApiOperation({ summary: 'Actualizar el estado de un pedido (Admin)' })
  updateEstado(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdatePedidoEstadoDto,
  ) {
    return this.pedidosService.updateEstado(id, dto);
  }
}
