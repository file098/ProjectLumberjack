import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, Output } from '@angular/core';
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
    let userData = JSON.parse(localStorage.getItem('userData')!);
    this.counterService.add(userData.username);
    EventEmitter
  }

  ngOnInit(): void {
    this.isLogin = this.auth.getUserDetails() == null ? true : false;
  }
}
