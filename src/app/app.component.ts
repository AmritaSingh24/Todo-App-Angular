import { Component } from '@angular/core';
import { TodoService } from './service/todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    private todoService: TodoService,
  ){}
  allClear(){
    this.todoService.allClear();
  }
}
