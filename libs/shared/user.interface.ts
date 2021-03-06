export interface UserInterface {
  id?: number;
  firstName?: string;
  lastName?: string;
  userName?: string;
  password?: string;
  phone?: number;
  admin?: boolean;
}

export interface Student extends UserInterface {
  school: string;
  year: string;
  questionaryAnswered: boolean;
  totalVisual: number;
  totalMovement: number;
  totalAuditory: number;
  studentProgress: string;
}
