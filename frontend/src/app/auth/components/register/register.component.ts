import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../../services/api.service';
import { AuthService } from './../../../services/auth.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../../models/user.model';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  isLogin: boolean = false;
  errorMessage: any;

  constructor(
    private _api: ApiService,
    private auth: AuthService,
    private _router: Router
  ) {}
  ngOnInit() {
    this.isUserLogin();
  }
  onSubmit(form: NgForm) {
    const newUser = new User(form.value.username, form.value.password);
    this.auth.signUp(newUser).subscribe((res) => {
      this.auth.signIn(newUser).subscribe((res) => {
        if (res) {
          const token = JSON.stringify(res);

          localStorage.setItem('token', token);
          this._router.navigate(['']);
        }
      });
    });
  }
  isUserLogin() {
    if (localStorage.getItem('token')) {
      this.isLogin = true;
    }
    // }
  }
}
