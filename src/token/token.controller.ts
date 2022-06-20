import { Body, Controller, Put } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AuthSwagger } from "src/swagger/auth/auth.swagger";
import { TokenBadCodeSwagger } from "src/swagger/helpers/token-bad-code.swagger";
import { RefreshTokenDto } from "./dto/refresh-token.dto";
import { TokenService } from "./token.service";

@Controller('api/v1/token')
@ApiTags('REFRESH TOKEN')
export class TokenController{
    constructor(
        private tokenService: TokenService
    ){}

    @Put('refresh')
    @ApiOperation({summary: "Atualizar token"})
    @ApiResponse({status: 401, description: "Token inválido", type: TokenBadCodeSwagger})
    @ApiResponse({status: 200, description: "Token atualizado com sucesso!", type: AuthSwagger})
    async refreshToken(@Body() data: RefreshTokenDto){
        return this.tokenService.refreshToken(data.oldToken)
    }
}