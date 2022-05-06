import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  todoArray: string[] = [];
  addTodo(value: any) {
    if (value != '') {
      this.todoArray.push(value);
    }
  }
}
