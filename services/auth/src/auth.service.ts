import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { User, UserDocument } from './user.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto): Promise<User> {
    const hashed = await bcrypt.hash(dto.password, 10);
    const created = new this.userModel({
      name: dto.name,
      email: dto.email,
      password: hashed,
      role: dto.role,
    });
    return created.save();
  }

  async validateUser(email: string, pass: string): Promise<User | null> {
    const user = await this.userModel.findOne({ email }).exec();
    if (user && (await bcrypt.compare(pass, user.password))) {
      return user;
    }
    return null;
  }

  async login(dto: LoginDto): Promise<{ access_token: string }> {
    const user = await this.validateUser(dto.email, dto.password);
    if (!user) {
      throw new Error('Invalid credentials');
    }
    const payload = { sub: user._id, email: user.email, role: user.role };
    return { access_token: this.jwtService.sign(payload) };
  }
}
