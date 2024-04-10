import { User } from "./user.model";
import { Colors } from "./color.model";
import { List } from "./list.model";
import { Card } from "./card.model";
export interface Board {
  id: number;
  title: string;
  backgroundColor: Colors;
  updatedAt: string;
  members: User[];
  lists: List[];
  cards: Card[];
}
