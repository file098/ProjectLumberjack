import { Component, OnInit } from '@angular/core';
import { Session } from '../models/sessions.model';
import { CounterService } from '../services/counter.service';

@Component({
  selector: 'app-recent-session',
  templateUrl: './recent-session.component.html',
  styleUrls: ['./recent-session.component.scss'],
})
export class RecentSessionComponent implements OnInit {
  sessionsList: Array<Session> = new Array();

  constructor(private counter: CounterService) {}

  ngOnInit(): void {
    //TODO: aggiorna quando viene clickato il +
    this.sessionsList = this.getSessions();
  }

  /** Gets sessions calling API e returns an array orderder by date */
  getSessions(): Array<Session> {
    //TODO: use the service to get sessions
    // this.counter.getRecentSessions();

    let mockDataArray: Array<Session> = [];
    let mockData = new Session('mockUser', 'ok', 'google.com', 5);
    for (let index = 0; index < 5; index++) {
      mockDataArray.push(mockData);
    }

    mockDataArray.sort((a, b) => {
      return (
        new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime()
      );
    });

    return mockDataArray;
  }
}
