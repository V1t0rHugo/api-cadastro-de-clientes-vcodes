import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type ClientDocument = Client & Document;

@Schema()
export class Client {
  @Prop()
  @ApiProperty()
  name: string;

  @Prop()
  @ApiProperty()
  phone: string;

  @Prop()
  @ApiProperty()
  email: string;

  @Prop()
  @ApiProperty()
  cpf: string;

  @Prop()
  @ApiProperty()
  address: string;
}

export const ClientSchema = SchemaFactory.createForClass(Client);