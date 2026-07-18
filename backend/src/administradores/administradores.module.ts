import { Module } from '@nestjs/common';
import { AdministradoresService } from './administradores.service';
import { AdministradoresController } from './administradores.controller';

@Module({
  providers: [AdministradoresService],
  controllers: [AdministradoresController],
  exports: [AdministradoresService],
})
export class AdministradoresModule {}
