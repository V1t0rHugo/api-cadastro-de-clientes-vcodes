import { ApiProperty } from "@nestjs/swagger";

export class TokenBadCodeSwagger {
    @ApiProperty()
    response: string[];

    @ApiProperty()
    status: number;

    @ApiProperty()
    message: string;

    @ApiProperty()
    name: string;
}