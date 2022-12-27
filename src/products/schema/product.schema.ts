import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {
  @Prop()
  name: string;

  @Prop({ type: 'Object' })
  category: {
    name: string;
    slug: string;
  };

  @Prop({ type: 'Object' })
  brand: {
    name: string;
    slug: string;
  };
  @Prop()
  slug: string;

  @Prop()
  status: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
