import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { TokenService } from 'src/token/token.service';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UsersService, private readonly jwtService: JwtService, private readonly tokenService: TokenService) {}

    async login(user) {
        const payload = { sub: user.id };
        const token = this.jwtService.sign(payload)
        this.tokenService.save(token, user.username)
        return {
            token: token,
        }
    }

    async validateUser(username: string, password: string) {
        const user = await this.userService.findOne(username);
        if(!user) return null;
        const isPasswordValid = compareSync(password, user.password);
        if (!isPasswordValid) return null;

        return user;
    }
}
