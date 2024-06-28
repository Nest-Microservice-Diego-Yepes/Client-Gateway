import { Body, Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { NATS_SERVICE } from 'src/config';
import { LoginUserDto } from './dto/loginUser.dto';
import { RegisterUserDto } from './dto';
import { catchError } from 'rxjs';
import { AuthGuard } from './guards/auth.guard';
import { Token, User } from './decorators';
import { CurrentUser } from './interfaces/currentUser.interfaces';

@Controller('auth')
export class AuthController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.client.send('login.user', loginUserDto).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }

  @Post('register')
  registerUser(@Body() registerUserDto: RegisterUserDto) {
    return this.client.send('register.user', registerUserDto).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }
  @UseGuards(AuthGuard)
  @Get('validateToken')
  validateToken(@User() user: CurrentUser, @Token() token: string) {
    // const user = req['user'];
    // const token = req['token'];
    return {
      user,
      token,
    };
    // return this.client.send('validate.token', {});
  }
}
