import { ApiProperty } from "@nestjs/swagger";

export class BadCodeSwagger {
    @ApiProperty()
    statusCode: number;

    @ApiProperty()
    message: string;

    @ApiProperty()
    error: string;
}