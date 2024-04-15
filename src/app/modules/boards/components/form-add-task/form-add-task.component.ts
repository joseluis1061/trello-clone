import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { faX } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-form-add-task',
  templateUrl: './form-add-task.component.html'
})
export class FormAddTaskComponent implements OnInit {
  faX = faX;
  formTask!: FormGroup;
  @Output() closeForm = new EventEmitter<boolean>();
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.formTask = this.fb.group({
      task: new FormControl('', [Validators.required, Validators.minLength(3)])
    })
  }

  onSubmit(){
    if(this.formTask.valid){
      const newTask = this.formTask.getRawValue();
    }
    this.closeForm.emit(false);
  }

  onClose(){
    this.closeForm.emit(false);
    console.log("CLOSE")
  }
}
