import { Injectable, Inject, HttpException, HttpStatus, forwardRef } from '@nestjs/common';
import { Token, TokenDocument } from './entities/token.entity';
import { AuthService } from 'src/auth/auth.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class TokenService {
  constructor(
    @Inject(UsersService) private userModel: UsersService,
    @InjectModel(Token.name) private tokenModel: Model<TokenDocument>,
    @Inject(forwardRef(()=>AuthService))
    private authService: AuthService
  ) {}

  async save(oldToken: string, username: string){
    let objToken = await this.tokenModel.findOne({oldToken: oldToken})
    if (objToken){
      this.tokenModel.findOneAndUpdate(objToken._id, {
        oldToken: oldToken
      })
    }else{
      const token = new this.tokenModel({oldToken: oldToken,username: username});
      return await token.save();
    }
  }

  async refreshToken(oldToken: string){
    let objToken = await this.tokenModel.findOne({ oldToken: oldToken })
    if (objToken){
      let usuario = await this.userModel.findOne(objToken.username)     
      // let usuario; 
      return this.authService.login(usuario)
    }else{ //é uma requisição inválida
      return new HttpException({
        errorMessage: 'Token inválido'
      }, HttpStatus.UNAUTHORIZED)
    }
  }

  async getUsuarioByToken(token: string): Promise<User>{
    token = token.replace("Bearer ","").trim()
    let objToken: Token = await this.tokenModel.findOne({oldToken: token})
    if (objToken){
      let usuario = await this.userModel.findOne(objToken.username)  
      // let usuario;
      return usuario
    }else{ //é uma requisição inválida
      return null
    }
  }
}