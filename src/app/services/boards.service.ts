import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { checkToken } from '@interceptors/token.interceptor';
import { Board } from '@models/boards.model';
import { Card } from '@models/card.model';



@Injectable({
  providedIn: 'root'
})
export class BoardsService {

  apiUrl = environment.API_URL;
  bufferState = 65535;

  constructor(private http: HttpClient) {}

  getBoard(id: string){
    return this.http.get<Board>(`${this.apiUrl}/api/v1/boards/${id}`, {
      context: checkToken(),
    });
  }



  getPosition(cards: Card[], currentIndex: number ){
    const lastIndex = cards.length -1;
    // New
    if(cards.length === 1){
      return this.bufferState;
    }
    // Top
    if(cards.length > 1 && currentIndex === 0){
      return cards[1].position / 2;
    }
    // Middle
    if(cards.length > 2 && currentIndex> 0 && currentIndex < lastIndex){
      const beforeIndex = cards[currentIndex - 1].position;
      const affterIndex = cards[currentIndex + 1].position;
      return (beforeIndex + affterIndex)/2;
    }
    // End
    if(cards.length > 1 && currentIndex === lastIndex){
      return cards[cards.length - 1].position + this.bufferState;
    }
    return -1;
  }

  createBoard(title: string, backgroundColor: string){
    return this.http.post<Board>(`${this.apiUrl}/api/v1/boards`, {title: title, backgroundColor: backgroundColor}, {context: checkToken()})
  }
}
