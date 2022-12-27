import { IsNotEmpty } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  category: object;
  @IsNotEmpty()
  brand: object;
  @IsNotEmpty()
  slug: string;
  @IsNotEmpty()
  status: string;
}
