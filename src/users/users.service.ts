import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { encodePassword } from 'src/utils/bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.entity';

@Injectable()
export class UsersService {

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto) {
    const password = encodePassword(createUserDto.password);
    const user = new this.userModel({...createUserDto, password});
    return await user.save();
  }

  async findAll() {
    return await this.userModel.find();
  }

  async findOne(username: string) {
    return await this.userModel.findOne({username});
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const password = encodePassword(updateUserDto.password);
    return await this.userModel.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        $set: updateUserDto, password
      },
      {
        new: true,
      },
    )
  }

  async remove(id: string) {
    return await this.userModel.deleteOne(
      {
        _id: id,
      },
    ).exec();
  }
}
