import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  Req,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { ProductosService } from './productos.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
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

@ApiTags('productos')
@Controller('productos')
export class ProductosController {
  constructor(private productosService: ProductosService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Crear un nuevo producto (Admin)' })
  @ApiResponse({ status: 201, description: 'Producto creado exitosamente' })
  create(@Body() dto: CreateProductoDto, @Req() req: RequestWithUser) {
    const adminId = req.user.userId;
    return this.productosService.create(dto, adminId);
  }

  @Get()
  @ApiOperation({ summary: 'Listar productos con filtros opcionales' })
  @ApiQuery({
    name: 'categoria_id',
    required: false,
    type: Number,
    description: 'Filtrar por ID de categoría',
  })
  @ApiQuery({
    name: 'estado',
    required: false,
    type: String,
    description: 'Filtrar por estado del producto',
  })
  @ApiQuery({
    name: 'busqueda',
    required: false,
    type: String,
    description: 'Buscar por nombre o descripción',
  })
  findAll(
    @Query('categoria_id') categoriaId?: string,
    @Query('estado') estado?: string,
    @Query('busqueda') busqueda?: string,
  ) {
    return this.productosService.findAll({
      categoria_id: categoriaId ? parseInt(categoriaId, 10) : undefined,
      estado,
      busqueda,
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener detalles de un producto por ID' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productosService.findOne(id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Actualizar un producto (Admin)' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateProductoDto,
  ) {
    return this.productosService.update(id, dto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Retirar/Eliminar un producto (Admin)' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productosService.remove(id);
  }
}
