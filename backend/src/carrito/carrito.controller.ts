import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
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
import { CarritoService } from './carrito.service';
import { AddItemDto } from './dto/add-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
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

@ApiTags('carrito')
@Controller('carrito')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('cliente')
export class CarritoController {
  constructor(private carritoService: CarritoService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener el carrito de compras activo del usuario' })
  getCart(@Req() req: RequestWithUser) {
    const usuarioId = req.user.userId;
    return this.carritoService.getOrCreateActiveCart(usuarioId);
  }

  @Post('agregar')
  @ApiOperation({
    summary: 'Agregar un producto o incrementar su cantidad en el carrito',
  })
  @ApiResponse({ status: 201, description: 'Producto agregado al carrito' })
  addItem(@Req() req: RequestWithUser, @Body() dto: AddItemDto) {
    const usuarioId = req.user.userId;
    return this.carritoService.addItem(usuarioId, dto);
  }

  @Patch('detalle/:detalleId')
  @ApiOperation({ summary: 'Modificar la cantidad de un ítem en el carrito' })
  updateItem(
    @Req() req: RequestWithUser,
    @Param('detalleId', ParseIntPipe) detalleId: number,
    @Body() dto: UpdateItemDto,
  ) {
    const usuarioId = req.user.userId;
    return this.carritoService.updateItem(usuarioId, detalleId, dto);
  }

  @Delete('detalle/:detalleId')
  @ApiOperation({ summary: 'Quitar un ítem del carrito' })
  removeItem(
    @Req() req: RequestWithUser,
    @Param('detalleId', ParseIntPipe) detalleId: number,
  ) {
    const usuarioId = req.user.userId;
    return this.carritoService.removeItem(usuarioId, detalleId);
  }

  @Delete('vaciar')
  @ApiOperation({ summary: 'Vaciar todo el carrito' })
  clearCart(@Req() req: RequestWithUser) {
    const usuarioId = req.user.userId;
    return this.carritoService.clearCart(usuarioId);
  }
}
