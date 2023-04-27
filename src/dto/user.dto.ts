import { IsDefined, IsIn, IsString } from 'class-validator';

export class CreateUserDto {
  @IsDefined({ message: 'os is a required field' })
  @IsString({ message: 'os must be a string' })
  @IsIn(['ios', 'android'], { message: 'os must be a ios or android' })
  os: 'ios' | 'android';

  @IsDefined({ message: 'uuid is a required field' })
  @IsString({ message: 'uuid must be a string' })
  uuid: string;
}
