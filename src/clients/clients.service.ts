import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client, ClientDocument } from './entities/client.entity';

@Injectable()
export class ClientsService {

  constructor(@InjectModel(Client.name) private clientModel: Model<ClientDocument>) {}

  async create(createClientDto: CreateClientDto) {
    let cpf = await this.clientModel.findOne({cpf: createClientDto.cpf})
    let phone = await this.clientModel.findOne({phone: createClientDto.phone})
    if(cpf){
      return {message: "CPF já cadastrado!"}
    } else if(phone) {
      return {message: "Número já cadastrado!"}
    }
    const client = new this.clientModel(createClientDto);
    return client.save();
  }

  findAll() {
    return this.clientModel.find();
  }

  findOne(id: string) {
    return this.clientModel.findById(id);
  }

  update(id: string, updateClientDto: UpdateClientDto) {
    return this.clientModel.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        $set: updateClientDto,
      },
      {
        new: true,
      }
    );
  }

  remove(id: string) {
    return this.clientModel.deleteOne(
      {
        _id: id,
      }
    ).exec();
  }
}
