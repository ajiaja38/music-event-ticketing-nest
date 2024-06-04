import { ERole } from 'src/utils/enum/ERole.enum';

export interface IJwtPayload {
  id: string;
  name: string;
  email: string;
  role: ERole;
}
