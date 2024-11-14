import { ApiProperty } from '@nestjs/swagger';

export class LegalPerson_CreateDto {
  @ApiProperty({ type: String, required: true })
  readonly name: string;
  @ApiProperty({ type: String, required: true })
  readonly address: string;
  @ApiProperty({ type: String, required: true })
  readonly phoneNumber: string;
  @ApiProperty({ type: String, required: true })
  readonly email: string;
  @ApiProperty({ type: String, required: true })
  readonly identityNumber: string;
}
