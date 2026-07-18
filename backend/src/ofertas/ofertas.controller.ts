import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { OfertasService } from './ofertas.service';
import { CreateOfertaDto } from './dto/create-oferta.dto';
import { UpdateOfertaDto } from './dto/update-oferta.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('ofertas')
@Controller('ofertas')
export class OfertasController {
  constructor(private ofertasService: OfertasService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Crear una nueva oferta especial (Admin)' })
  @ApiResponse({
    status: 201,
    description: 'Oferta especial creada exitosamente',
  })
  create(@Body() dto: CreateOfertaDto) {
    return this.ofertasService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas las ofertas especiales' })
  findAll() {
    return this.ofertasService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una oferta especial por ID' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.ofertasService.findOne(id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Actualizar una oferta especial (Admin)' })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateOfertaDto) {
    return this.ofertasService.update(id, dto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Eliminar una oferta especial (Admin)' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.ofertasService.remove(id);
  }
}
