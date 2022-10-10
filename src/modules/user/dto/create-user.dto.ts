import { ERole } from '../../../common/enums/role.enum';

export class CreateUserDto {
  email!: string;
  password!: string;
  name!: string;
  contactPhone!: string;
  role!: ERole;
}
