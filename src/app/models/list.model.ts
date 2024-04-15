import { Card } from "./card.model"
import { Colors } from "./color.model";
import { User } from "./user.model";

export interface List {
  id: string;
  title: string;
  backgroundColor: Colors;
  members: User[];
  lists: List[];
  cards: Card[];
  showCardForm: boolean;
}
