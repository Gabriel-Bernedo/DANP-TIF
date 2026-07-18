import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from '../usuarios/dto/login.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Iniciar sesión (Clientes)' })
  @ApiResponse({ status: 200, description: 'Login exitoso, devuelve el JWT' })
  @ApiResponse({ status: 401, description: 'Credenciales inválidas' })
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post('login-admin')
  @ApiOperation({ summary: 'Iniciar sesión (Administradores)' })
  @ApiResponse({
    status: 200,
    description: 'Login exitoso, devuelve el JWT de administrador',
  })
  @ApiResponse({ status: 401, description: 'Credenciales inválidas' })
  loginAdmin(@Body() dto: LoginDto) {
    return this.authService.loginAdmin(dto);
  }
}
