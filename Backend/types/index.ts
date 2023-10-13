export interface Survey {
  id: string;
  owner_id: string;
  title: string;
  description: string;
  creation_date: Date;
  deadline: Date;
  participants: string[];
}
