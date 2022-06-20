import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type TokenDocument = Token & Document;

@Schema()
export class Token {
  @Prop()
  @ApiProperty()
  username: string;

  @Prop()
  @ApiProperty()
  oldToken: string;

}
export const TokenSchema = SchemaFactory.createForClass(Token);