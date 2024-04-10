import { User } from "./user.model";
import { Colors } from "./color.model";
export interface Board {
  id: number,
  title: string,
  backgroundColor: Colors,
  updatedAt: string,
  members: User[]
}
