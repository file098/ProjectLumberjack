import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, Output } from '@angular/core';
import { Session } from '../models/sessions.model';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { CounterService } from '../services/counter.service';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss'],
})
export class CounterComponent {
  isLogin: boolean | undefined;
  counter: number = 0;

  constructor(
    private auth: AuthService,
    private counterService: CounterService
  ) {}

  increment() {
    let username = JSON.parse(localStorage.getItem('token')!).username;
    if (username) {
      this.counterService.add(username, new Session()).subscribe((res) => {
        console.log(res);
      });
    } else {
      console.log('not logged in');
    }
  }

  ngOnInit(): void {
    // this.isLogin = this.() == null ? true : false;
  }
}
