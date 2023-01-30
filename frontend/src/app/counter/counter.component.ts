import { ThisReceiver } from '@angular/compiler';
import { Component, EventEmitter, Inject, Output } from '@angular/core';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Session } from '../models/sessions.model';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { CounterService } from '../services/counter.service';

export interface DialogData {
  username: string;
  review: string;
  source: string;
  grade: number;
}
@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss'],
})
export class CounterComponent {
  isLogin: boolean | undefined;
  counter: number = 0;
  username!: string;
  @Output() added: EventEmitter<any> = new EventEmitter();

  constructor(
    private auth: AuthService,
    private counterService: CounterService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.username = JSON.parse(localStorage.getItem('token')!).username;
  }

  // increment() {
  //   if (this.username) {
  //     this.counterService.add(this.username, new Session()).subscribe((res) => {
  //       this.counterService.hasAdded();
  //     });
  //   } else {
  //     console.log('not logged in');
  //   }
  // }

  openDialog(): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      id: 1,
      title: 'Angular For Beginners',
    };
    const dialogRef = this.dialog.open(AddButtonDialog, {
      width: '80%',
      data: { username: this.username },
      panelClass: 'custom-modalbox',
    });

    dialogRef.afterClosed().subscribe((result) => {
      // console.log(result);
    });
  }
}

@Component({
  templateUrl: 'add-button-dialog.html',
})
export class AddButtonDialog {
  constructor(
    private counterService: CounterService,
    public dialogRef: MatDialogRef<AddButtonDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  submit() {
    console.log(this.data);
    this.counterService.add(this.data.username, new Session(this.data.review, this.data.source, this.data.grade)).subscribe((res) => {
      this.counterService.hasAdded();
    });
    this.dialogRef.close();
  }
}
