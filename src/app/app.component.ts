import {
  trigger,
  animate,
  style,
  transition,
  keyframes,
} from '@angular/animations';
import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('moveInLeft', [
      transition('void=> *', [
        style({ transform: 'translateX(300px)' }),
        animate(
          200,
          keyframes([
            style({ transform: 'translateX(300px)' }),
            style({ transform: 'translateX(0)' }),
          ])
        ),
      ]),

      transition('*=>void', [
        style({ transform: 'translateX(0px)' }),
        animate(
          100,
          keyframes([
            style({ transform: 'translateX(0px)' }),
            style({ transform: 'translateX(300px)' }),
          ])
        ),
      ]),
    ]),
  ],
})
export class AppComponent implements OnInit {
  todoArray: string[] = [];
  constructor(private serv: HttpService) {}
  //add service for the https stuff
  //todoForm: new FormGroup()
  updatelist() {
    var top = this.serv.httpGet('http://localhost:3000/development/db');
    var numberPattern = /\d+/g;
    var topnums = String(top.match(numberPattern));
    var topnum = parseInt(topnums);
    this.todoArray.length = 0;
    for (let i = 0; i < topnum; i++) {
      var rawin = this.serv.httpPost(
        'http://localhost:3000/development/getfunc',
        i
      );
      var temp = rawin.split('"');
      this.todoArray.push(temp[9]);
    }
  }
  addTodo(value: string) {
    if (value !== '') {
      var temp = '"' + value + '"';
      console.log(temp);
      var response2 = this.serv.httpPost(
        'http://localhost:3000/development/createfunc',
        temp
      );
      this.updatelist();
    } else {
      alert('Field required **');
    }
  }
  public ngOnInit(): void {
    this.updatelist();
  }
  /*delete item*/
  deleteItem(todo: any) {
    for (let i = 0; i <= this.todoArray.length; i++) {
      if (todo == this.todoArray[i]) {
        this.serv.httpPost('http://localhost:3000/development/deletefunc', i);

        this.updatelist();
      }
    }
  }

  // submit Form
  todoSubmit(value: any) {
    if (value !== '') {
      this.todoArray.push(value);
      //this.todoForm.reset()
    } else {
      alert('Field required **');
    }
  }
}
