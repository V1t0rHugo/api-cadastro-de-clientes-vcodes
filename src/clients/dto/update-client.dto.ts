import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { CreateClientDto } from './create-client.dto';

export class UpdateClientDto extends PartialType(CreateClientDto) {
    @ApiPropertyOptional()
    name: string;

    @ApiPropertyOptional()
    phone: string;

    @ApiPropertyOptional()
    @IsEmail()
    email: string;

    @ApiPropertyOptional()
    cpf: string;

    @ApiPropertyOptional()
    address: string;
}
