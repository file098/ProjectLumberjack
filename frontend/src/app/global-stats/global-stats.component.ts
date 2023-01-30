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
  scoreboard: { _id: string; total: number }[] = [];

  constructor(
    private counterService: CounterService,
    private auth: AuthService
  ) {}

  reset(): void {
    this.isLogin = false;
    this.counter = 0;
    this.userCounter = 0;
    this.scoreboard = [];
  }

  ngOnInit(): void {
    this.counterService.added.subscribe((data: string) => {
      this.reset();
      this.populateData();
    });
    this.populateData();
  }

  populateData(): void {
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

    this.counterService.getScoreboard().subscribe((res) => {
      res.forEach((userEntry: { _id: string; total: number }) => {
        this.scoreboard.push(userEntry);
      });
      this.scoreboard.sort((a: any, b: any) => {
        return b.total - a.total;
      });
    });
  }
}
