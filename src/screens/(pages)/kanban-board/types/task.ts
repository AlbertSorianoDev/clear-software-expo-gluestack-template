export interface Task {
  id: number;
  columnId: number;
  assignedClientId: number;
  assignedUserId: number;
  name: string;
  notes: string;
  order: number;
  budgetInMinutes: number;
  images: { uri: string; name: string }[];
  files: { uri: string; name: string }[];
}
