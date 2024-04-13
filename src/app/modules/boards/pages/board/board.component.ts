import { Component, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Dialog } from '@angular/cdk/dialog';
import { TodoDialogComponent } from '@boards/components/todo-dialog/todo-dialog.component';
import { BoardsService } from '@services/boards.service';
import { Board } from '@models/boards.model';

import { CardService } from '@services/card.service';

import { ToDo, Column } from '@models/todo.model';
import { ActivatedRoute } from '@angular/router';
import { reduce } from 'rxjs';
import { List } from '@models/list.model';
import { Card, UpdateCardDto } from '@models/card.model';
@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styles: [
    `
      .cdk-drop-list-dragging .cdk-drag {
        transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
      }
      .cdk-drag-animating {
        transition: transform 300ms cubic-bezier(0, 0, 0.2, 1);
      }
    `,
  ],
})
export class BoardComponent implements OnInit{
  id: string | null = null;
  board: Board | null = null;

  columns: Column[] = [];
  lists: List[] | null  = null;

  constructor(
    private dialog: Dialog,
    private boardsService: BoardsService,
    private activatedRoute: ActivatedRoute,
    private cardService: CardService
  ) {

  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
        this.id = params.get('boardId');
        if(this.id) this.getBoardDetail(this.id);
      }
    );
  }

  getBoardDetail(id:string){
    this.boardsService.getBoard(id).subscribe({
      next: (response) => {
        this.board = response;
        this.lists = response.lists;
      },
      error: error => { console.log(error) }
    })
  }
  drop(event: CdkDragDrop<Card[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    const newPosition  = this.boardsService.getPosition(event.container.data, event.currentIndex);
    const card = event.container.data[event.currentIndex];
    const listId = event.container.id;
    this.updateCard(card, newPosition, listId);
  }

  addColumn() {
    this.columns.push({
      title: 'New Column',
      todos: [],
    });
  }

  openDialog(card: Card) {
    const dialogRef = this.dialog.open(TodoDialogComponent, {
      minWidth: '300px',
      maxWidth: '50%',
      data: {
        card: card,
      },
    });
    dialogRef.closed.subscribe((output) => {
      if (output) {
        console.log(output);
      }
    });
  }

  updateCard(card: Card, position: number, listId: string | number){
    this.cardService.update(card.id, { position, listId }).subscribe({
      next: (cardUpdate) => {
        console.log("Actualizació: ", cardUpdate);
      },
      error: (error) => console.log(error)
    });
  }
}
