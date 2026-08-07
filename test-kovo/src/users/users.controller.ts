import { Controller, Get, Put, UseGuards, Req, Body } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guards';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UsersService } from './users.service';
import * as express from 'express';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Profile')
@ApiBearerAuth()
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Récupération du profil de l'utilisateur" })
  @ApiResponse({ status: 200, description: 'Profil récupéré avec succès' })
  @Get('profile')
  getProfile(@Req() req: express.Request) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Mise à jour du profil de l'utilisateur" })
  @ApiResponse({ status: 200, description: 'Profil mis à jour avec succès' })
  @ApiResponse({ status: 400, description: 'Données de profil invalides' })
  @ApiResponse({ status: 401, description: 'Utilisateur non autorisé' })
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
