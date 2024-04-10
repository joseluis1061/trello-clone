import { User } from "./user.model"
export interface Board {
  id: number,
  title: string,
  backgroundColor: string,
  creationAt: string,
  updatedAt: string,
  members: User[]
}
