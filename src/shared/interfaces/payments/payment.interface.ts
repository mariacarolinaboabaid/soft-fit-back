export interface Payment {
  id: string;
  value: number;
  dueDate: Date;
  paid: boolean;
}
