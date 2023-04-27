import { IsDefined, IsString } from 'class-validator';

export class CreateTransactionDto {
  @IsDefined({ message: 'calculation is a required field' })
  @IsString({ message: 'calculation must be a string' })
  calculation: string;
}
