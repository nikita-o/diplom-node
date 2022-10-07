import { IsEmail, IsEnum, IsPhoneNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../../database/schemas/user.schema';
import { ERole } from '../../../common/enums/role.enum';

export class CreateUserDto extends User {
  @ApiProperty()
  @IsEmail()
  email!: string;

  @ApiProperty()
  @IsString()
  password!: string;

  @ApiProperty()
  @IsString()
  name!: string;

  @ApiProperty()
  @IsPhoneNumber()
  contactPhone?: string;

  @ApiProperty()
  @IsEnum(ERole)
  role: ERole = ERole.Client;
}
