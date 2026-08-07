import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    example: 'john.doe@example.com',
    description: "Adresse email de l'utilisateur",
  })
  @IsEmail()
  email!: string;

  @ApiProperty({
    example: '123456',
    description: "Mot de passe de l'utilisateur",
  })
  @IsNotEmpty()
  @MinLength(6)
  password!: string;
}
