import { ConflictException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async register(
    dto: RegisterDto,
  ): Promise<{ message: string; user: Partial<User> }> {
    // 1. Check if user already exists
    const userExists: User | null = await this.userService.findByEmail(
      dto.email,
    );
    if (userExists) {
      throw new ConflictException('User with this email already exists.');
    }

    // 2. Hash the password
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    // 3. Create new user
    const newUser: User = await this.userService.createUser({
      email: dto.email,
      password: hashedPassword,
      nonce: '',
    });

    // 4. Safely remove password using standard delete instead of unused destructuring
    const userResponse = { ...newUser } as Record<string, any>;
    delete userResponse.password;

    return {
      message: 'User registered successfully.',
      user: userResponse as Partial<User>,
    };
  }
}
