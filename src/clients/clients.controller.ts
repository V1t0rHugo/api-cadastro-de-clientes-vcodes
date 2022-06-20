import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ClientSwagger } from 'src/swagger/client/client.swagger';
import { CreateClientSwagger } from 'src/swagger/client/create-client.swagger';
import { OneClientSwagger } from 'src/swagger/client/one-client.swagger';
import { UpdateClientSwagger } from 'src/swagger/client/update-client.swagger';
import { BadCodeSwagger } from 'src/swagger/helpers/bad-code.swagger';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Controller('/api/v1/clients')
@ApiTags('CLIENTES')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  @ApiOperation({summary: "Cadstrar um cliente"})
  @ApiResponse({status: 201, description: "Cliente cadastrado com sucesso", type: CreateClientSwagger})
  @ApiResponse({status: 400, description: "Parâmetros inválidos", type: BadCodeSwagger})
  @ApiResponse({status: 401, description: "Não autorizado", type: BadCodeSwagger})
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientsService.create(createClientDto);
  }

  @Get()
  @ApiOperation({summary: "Listar os dados de todos os clientes"})
  @ApiResponse({status: 200, description: "Lista de clientes retornada com sucesso", type: ClientSwagger, isArray: true})
  @ApiResponse({status: 401, description: "Não autorizado", type: BadCodeSwagger})
  findAll() {
    return this.clientsService.findAll();
  }

  @Get(':id')
  @ApiOperation({summary: "Listar os dados de um cliente"})
  @ApiResponse({status: 200, description: "Dados do cliente retornado com sucesso", type: OneClientSwagger})
  @ApiResponse({status: 404, description: "Cliente não encontrado", type: BadCodeSwagger})
  @ApiResponse({status: 401, description: "Não autorizado", type: BadCodeSwagger})
  findOne(@Param('id') id: string) {
    return this.clientsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({summary: "Atualizar os dados de um cliente"})
  @ApiResponse({status: 200, description: "Dados do cliente atualizados com sucesso", type: UpdateClientSwagger})
  @ApiResponse({status: 404, description: "Cliente não encontrado", type: BadCodeSwagger})
  @ApiResponse({status: 400, description: "Dados inválidos", type: BadCodeSwagger})
  @ApiResponse({status: 401, description: "Não autorizado", type: BadCodeSwagger})
  update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
    return this.clientsService.update(id, updateClientDto);
  }

  @Delete(':id')
  @ApiOperation({summary: "Deletar um cliente"})
  @ApiResponse({status: 204, description: "Cliente deletado com sucesso"})
  @ApiResponse({status: 404, description: "Cliente não encontrado", type: BadCodeSwagger})
  @ApiResponse({status: 401, description: "Não autorizado", type: BadCodeSwagger})
  remove(@Param('id') id: string) {
    return this.clientsService.remove(id);
  }
}
