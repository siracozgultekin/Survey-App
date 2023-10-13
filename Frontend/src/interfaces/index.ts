type User = {
  id: string;
  is_admin: false;
  name: string;
  surname: string;
  email: string;
  password: string;
  registration_date: string;
  participated_surveys: string[];
};
export type { User };
export interface Survey {
  id: string;
  owner_id: string;
  title: string;
  description: string;
  creation_date: Date;
  deadline: Date;
  participants: string[];
}
