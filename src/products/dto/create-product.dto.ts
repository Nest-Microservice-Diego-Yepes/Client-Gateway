import { Type } from 'class-transformer';
import { IsString, Min } from 'class-validator';

export class CreateProductDto {
  @IsString()
  public name: string;

  @Min(0)
  @Type(() => Number)
  public price: number;
}
