import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsString ,IsEmail, IsOptional, IsBoolean} from "class-validator";



export class PermissionDto {
    @ApiProperty()
    @IsOptional()
    @IsBoolean()
    read?: boolean;
    
    @ApiProperty()
    @IsOptional()
    @IsBoolean()
    write?: boolean;
    
    
    @ApiProperty()
    @IsOptional()
    @IsBoolean()
    updated?: boolean;
    
    @IsOptional()
    @ApiProperty()
    @IsBoolean()
    delete?: boolean;
  }
  
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


  export class UpdateAdminDto {
  
    @IsOptional()
    @ApiProperty({ example: 'admin_faxriddin' })
    @IsString()
    @IsNotEmpty()
    username?: string;
  
    @IsOptional()
    @ApiProperty({ example: 'StrongP@ssword123' })
    @IsNotEmpty()
    @IsString()
    password?: string;
  
    @IsOptional()
    @ApiProperty({ example: 'admin@example.com' })
    @IsNotEmpty()
    @IsEmail()
    email?: string;
  }
