import { IsNotEmpty, IsInt, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateItemDto {
  @ApiProperty({ example: 3 })
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  cantidad!: number;
}
