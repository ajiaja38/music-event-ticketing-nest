import { ERole } from '../../../utils/enum/ERole.enum';

export interface IUserDetail {
  id: string;
  name: string;
  email: string;
  role: ERole;
  tickets: { id: string; code: string }[];
}
