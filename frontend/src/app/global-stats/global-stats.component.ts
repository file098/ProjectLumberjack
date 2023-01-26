import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CounterService } from '../services/counter.service';

@Component({
  selector: 'app-global-stats',
  templateUrl: './global-stats.component.html',
  styleUrls: ['./global-stats.component.scss'],
})
export class GlobalStatsComponent {
  isLogin: boolean = false;
  counter: number = 0;
  userCounter: number = 0;
  scoreboard: { username: string; total: number }[] = [];

  constructor(
    private counterService: CounterService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.counterService.getTotal().subscribe((res) => {
      this.counter = res.total;
    });

    this.isLogin = true;
    const userData = JSON.parse(localStorage.getItem('token')!);
    if (userData) {
      this.counterService.getUserTotal(userData.username).subscribe((res) => {        
        this.userCounter = res.total;
      });
    }

    // this.counterService.getScoreboard().subscribe((res) => {
    //   res.data.forEach((userEntry: { username: string; total: number }) => {
    //     this.scoreboard.push(userEntry);
    //   });
    // });
  }
}
