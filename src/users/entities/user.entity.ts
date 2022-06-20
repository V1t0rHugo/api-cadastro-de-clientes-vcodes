import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  @ApiProperty()
  username: string;

  @Prop()
  @ApiProperty()
  password: string;

}
export const UserSchema = SchemaFactory.createForClass(User);