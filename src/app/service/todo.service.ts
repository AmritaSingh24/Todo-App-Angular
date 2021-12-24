import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor() { }

  todoStorage = localStorage.getItem('todoList');
  todoItems = [] as any;

  findAll(){
    if(this.todoStorage != null){
      return JSON.parse(this.todoStorage);
    }
    return null;
  }
  
  obj(task:string, priority:string){
    let todoObj = {
      task: task,
      priority: priority,
      isDone:false,
      addedAt: new Date().getTime()
    }
    this.add(todoObj)
  }

  add(todoObj : object){
    if(this.todoStorage == null || this.todoStorage == undefined){
      this.todoItems
      this.todoItems.push(todoObj);
      localStorage.setItem('todoList', JSON.stringify(this.todoItems));
    }else{
      this.todoItems = JSON.parse(this.todoStorage);
      this.todoItems.push(todoObj);
      localStorage.setItem('todoList', JSON.stringify(this.todoItems));
    }
    window.location.reload();
  }

  isComplete(addedAt: number){
    if(this.todoStorage != null && this.todoStorage != undefined){
      this.todoItems = JSON.parse(this.todoStorage);
      for(let todo of this.todoItems){
        if(todo.addedAt == addedAt){
          todo.isDone = true;
          localStorage.setItem('todoList', JSON.stringify(this.todoItems));
        }
      }
    }
    window.location.reload();
  }
  
  delete(index: number){
    if(this.todoStorage != null && this.todoStorage != undefined){
      this.todoItems = JSON.parse(this.todoStorage);
      this.todoItems.splice(index, 1);
      localStorage.setItem('todoList', JSON.stringify(this.todoItems));
    }
    window.location.reload();
  }

  allClear(){
    this.todoItems = [];
    localStorage.setItem('todoList', JSON.stringify(this.todoItems));
    window.location.reload();
  }

}
