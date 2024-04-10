import { User } from "./user.model"
export interface Board {
  id: number,
  title: string,
  backgroundColor:'sky' | 'yellow' | 'green' | 'red' | 'violet' | 'gray',
  updatedAt: string,
  members: User[]
}
