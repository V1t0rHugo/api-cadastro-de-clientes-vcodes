import { Prop } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";

export class AuthSwagger {
    @Prop()
    @ApiProperty()
    token: string;
}