import { Component, Output, EventEmitter  } from '@angular/core';
import { FormBuilder, Validators  } from '@angular/forms';
import { BoardsService } from '@services/boards.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
@Component({
  selector: 'app-form-create-board',
  templateUrl: './form-create-board.component.html'
})
export class FormCreateBoardComponent {
  @Output() closeOverlayCreateBoard = new EventEmitter<boolean>(false);

  constructor(
    private formBuilder: FormBuilder,
    private boardsService: BoardsService,
    private router: Router
  ){}

  form = this.formBuilder.nonNullable.group({
    title: ['', [Validators.required, Validators.required]],
    backgroundColor: ['', [Validators.required, Validators.required]],
  });

  createBoard(){
    if (this.form.valid) {
      const { title, backgroundColor } = this.form.getRawValue();
      this.boardsService.createBoard(title, backgroundColor).subscribe({
        next: (board) => {
          this.router.navigate(['/app/boards', board.id]);
          this.closeOverlayCreateBoard.emit(false);
        },
        error: (error) => {
          console.log(error)
        }
      });
    }else {
      this.form.markAllAsTouched();
    }
  }

}
