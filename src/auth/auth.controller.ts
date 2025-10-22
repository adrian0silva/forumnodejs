import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './login.dto';
import { AuthGuard } from '@nestjs/passport';
import { GoogleAuthGuard } from './google-auth.guard';
import { Public } from './public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('atualiza_token')
  renovar_token(@Body() body: any) {
    const { refresh_token } = body;
    return this.authService.refresh(refresh_token);
  }
  // Login normal (email/senha)
  @Public()
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  // Redireciona para login Google
  @Public()
  @UseGuards(GoogleAuthGuard)
  @Get('google')
  async googleAuth(@Req() req) {
    // o Guard redireciona para o Google, então aqui não precisa fazer nada
  }

  // Callback do Google
  @Public()
  @UseGuards(GoogleAuthGuard)
  @Get('google/redirect')
  async googleAuthRedirect(@Req() req, @Res() res) {
    console.log('teste')
    const { access_token } = await this.authService.googleLogin(req);
    res.redirect(`http://localhost:5173/auth/callback?token=${access_token}`)

  } 
}
