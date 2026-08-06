import { Controller, Get, Put, UseGuards, Req, Body } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guards';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UsersService } from './users.service';
import * as express from 'express';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req: express.Request) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Put('profile')
  async updateProfile(
    @Req() req: express.Request,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    const user = req.user as { userId: string };
    const userId = user.userId;

    return this.usersService.updateProfile(userId, updateProfileDto);
  }
}
