import { IsEnum, IsNotEmpty, IsNumberString } from 'class-validator';
import { Role } from '../../../shared/constants/roles.enum';

export class UpdateRiderStatusDto {
  @IsEnum(['online', 'offline', 'busy'])
  status: 'online' | 'offline' | 'busy';
}

export class UpdateRiderLocationDto {
  @IsNumberString()
  lat: string;

  @IsNumberString()
  lng: string;
}
