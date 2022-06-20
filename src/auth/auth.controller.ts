import { Body, Controller, Post, Req, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthSwagger } from 'src/swagger/auth/auth.swagger';
import { BadCodeSwagger } from 'src/swagger/helpers/bad-code.swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';

@Controller('api/v1/auth')
@ApiTags('LOGIN')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @UseGuards(AuthGuard('local'))
    @Post('login')
    @ApiOperation({summary: "Logar na aplicação"})
    @ApiResponse({status: 201, description: "Cliente logado com sucesso", type: AuthSwagger})
    @ApiResponse({status: 401, description: "Não autorizado", type: BadCodeSwagger})
    async login(@Body() createUserDto: CreateUserDto, @Req() req: any) {
        return await this.authService.login(req.user);
    }

}
