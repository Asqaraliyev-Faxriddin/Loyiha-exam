import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateAdminDto {
  
  @ApiProperty({ example: 'admin_faxriddin' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: 'StrongP@ssword123' })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({ example: 'admin@example.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
