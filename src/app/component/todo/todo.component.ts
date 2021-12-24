import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { filter } from 'rxjs';
import { TodoService } from 'src/app/service/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  todoform!: FormGroup;
  todos = [] as any;
  classes = "displaynone";
  filter: 'all' | 'completed' | 'incompleted' = 'all';
  filterItems = [] as any;

  constructor( 
    private todoService: TodoService,
    private formBuilder: FormBuilder
    ) {   }

  ngOnInit(): void {
    this.todoform = this.formBuilder.group({
      task: ['', [Validators.required]],
      priority: ['', [Validators.required]]
    });
    this.todos = this.todoService.findAll();
    this.items(this.filter)
  }

  add(){
    if(!this.todoform.value.task && !this.todoform.value.priority){
      this.classes = "displayblock";
    }else{
      this.todoService.obj(this.todoform.value.task, this.todoform.value.priority)
      this.todos = this.todoService.findAll();
    }    
  }

  delete(index: number){
    this.todoService.delete(index);
    this.todos = this.todoService.findAll();
  }

  isComplete(addedAt: number){
    this.todoService.isComplete(addedAt);
    window.location.reload();
  }

  items(filter:string) {
    switch(filter){
      case "incompleted":
        this.filterItems = this.todos.filter((item:any) => !item.isDone);
          break;
      case "completed":
        this.filterItems = this.todos.filter((item:any) => item.isDone);
          break;
      default:
        this.filterItems = this.todos;
        }
  }
  handleFilterChange(filter:any){
    this.filter = filter
    this.items(filter)
  }

}
