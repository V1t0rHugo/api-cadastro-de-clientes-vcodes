import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserSwagger } from 'src/swagger/user/user.swagger';
import { CreateUserSwagger } from 'src/swagger/user/create-user.swagger';
import { OneUserSwagger } from 'src/swagger/user/one-user.swagger';
import { UpdateUserSwagger } from 'src/swagger/user/update-user.swagger';
import { BadCodeSwagger } from 'src/swagger/helpers/bad-code.swagger';


@Controller('api/v1/users')
@ApiTags('USUÁRIOS')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({summary: "Cadstrar um usuário"})
  @ApiResponse({status: 201, description: "Usuário cadastrado com sucesso", type: CreateUserSwagger})
  @ApiResponse({status: 400, description: "Parâmetros inválidos", type: BadCodeSwagger})
  @ApiResponse({status: 401, description: "Não autorizado", type: BadCodeSwagger})
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({summary: "Listar os dados de todos os usuários"})
  @ApiResponse({status: 200, description: "Lista de usuários retornada com sucesso", type: UserSwagger, isArray: true})
  @ApiResponse({status: 401, description: "Não autorizado", type: BadCodeSwagger})
  async findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({summary: "Listar os dados de um usuário"})
  @ApiResponse({status: 200, description: "Dados do usuário retornado com sucesso", type: OneUserSwagger})
  @ApiResponse({status: 404, description: "Usuário não encontrado", type: BadCodeSwagger})
  @ApiResponse({status: 401, description: "Não autorizado", type: BadCodeSwagger})
  async findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({summary: "Atualizar os dados de um usuário"})
  @ApiResponse({status: 200, description: "Dados do usuário atualizados com sucesso", type: UpdateUserSwagger})
  @ApiResponse({status: 404, description: "Usuário não encontrado", type: BadCodeSwagger})
  @ApiResponse({status: 400, description: "Dados inválidos", type: BadCodeSwagger})
  @ApiResponse({status: 401, description: "Não autorizado", type: BadCodeSwagger})
  async update(@Param('id') username: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(username, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({summary: "Deletar um usuário"})
  @ApiResponse({status: 204, description: "Usuário deletado com sucesso"})
  @ApiResponse({status: 404, description: "Usuário não encontrado", type: BadCodeSwagger})
  @ApiResponse({status: 401, description: "Não autorizado", type: BadCodeSwagger})
  async remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
