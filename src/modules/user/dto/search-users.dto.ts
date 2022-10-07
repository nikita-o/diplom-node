import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNumber,
  IsPhoneNumber,
  IsPositive,
  IsString,
} from 'class-validator';

export class SearchUsersDto {
  @ApiProperty()
  @IsPositive()
  limit: number = 10;

  @ApiProperty()
  @IsNumber()
  offset: number = 0;

  @ApiProperty()
  @IsEmail()
  email!: string;

  @ApiProperty()
  @IsString()
  name!: string;

  @ApiProperty()
  @IsPhoneNumber()
  contactPhone!: string;
}
