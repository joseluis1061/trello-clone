import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { CardService } from '@services/card.service';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { List } from '@models/list.model';
import { BoardsService } from '@services/boards.service';

@Component({
  selector: 'app-form-add-task',
  templateUrl: './form-add-task.component.html'
})
export class FormAddTaskComponent implements OnInit {
  faX = faX;
  formTask!: FormGroup;
  @Input() list!: List;
  @Input() boardId!: number;
  @Output() closeForm = new EventEmitter<boolean>();
  constructor(
    private fb: FormBuilder,
    private boardsService: BoardsService,
    private cardService: CardService
  ) { }


  ngOnInit(): void {
    this.formTask = this.fb.group({
      task: new FormControl('', [Validators.required, Validators.minLength(3)])
    })
  }

  createCard(){
    if(this.formTask.valid){
      const { task } = this.formTask.getRawValue();
      this.cardService.create({
        title: task,
        listId: this.list.id,
        boardId: this.boardId,
        position: this.boardsService.getPositionNewTask(this.list.cards)
      }).subscribe({
        next: (card) => {
          this.list.cards.push(card);
          this.formTask.setValue({'task':''});
          this.list.showCardForm = false;
        },
        error: error => {
          console.log(error)
        }
      })
    }
  }

  onClose(){
    this.closeForm.emit(false);
  }


}
