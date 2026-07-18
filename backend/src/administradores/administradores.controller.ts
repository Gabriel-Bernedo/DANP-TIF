import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AdministradoresService } from './administradores.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('administradores')
@Controller('administradores')
export class AdministradoresController {
  constructor(private administradoresService: AdministradoresService) {}

  @Post('registro')
  @ApiOperation({ summary: 'Registrar un nuevo administrador' })
  @ApiResponse({
    status: 201,
    description: 'Administrador creado exitosamente',
  })
  @ApiResponse({ status: 409, description: 'El email ya está registrado' })
  registro(@Body() dto: CreateAdminDto) {
    return this.administradoresService.create(dto);
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Listar todos los administradores' })
  findAll() {
    return this.administradoresService.findAll();
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Obtener detalles de un administrador por ID' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.administradoresService.findOne(id);
  }
}
