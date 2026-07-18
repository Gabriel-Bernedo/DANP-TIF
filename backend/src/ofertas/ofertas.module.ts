import { Module } from '@nestjs/common';
import { OfertasService } from './ofertas.service';
import { OfertasController } from './ofertas.controller';

@Module({
  providers: [OfertasService],
  controllers: [OfertasController],
  exports: [OfertasService],
})
export class OfertasModule {}
