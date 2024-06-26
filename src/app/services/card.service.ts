import { Injectable } from '@angular/core';
import { checkToken } from '@interceptors/token.interceptor';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Card, UpdateCardDto, CreateCardDto } from '@models/card.model';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  private apiUrl = environment.API_URL;
  constructor(
    private http: HttpClient
  ) { }

  create(dto: CreateCardDto){
    return this.http.post<Card>(`${this.apiUrl}/api/v1/cards`, dto,
      {context: checkToken()}
    )
  }

  update(id: Card['id'], changes: UpdateCardDto){
    return this.http.put<Card>(`${this.apiUrl}/api/v1/cards/${id}`, changes, {context: checkToken()})
  }
}
