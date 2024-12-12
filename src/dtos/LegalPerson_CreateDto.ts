import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LegalPerson_CreateDto {
  @ApiProperty({ type: String, required: true })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({ type: String, required: true })
  @IsNotEmpty()
  @IsString()
  readonly address: string;

  @ApiProperty({ type: String, required: true })
  @IsNotEmpty()
  @IsString()
  readonly phoneNumber: string;

  @ApiProperty({ type: String, required: true })
  @IsNotEmpty()
  @IsString()
  readonly email: string;

  @ApiProperty({ type: String, required: true })
  @IsNotEmpty()
  @IsString()
  readonly identityNumber: string;
}
