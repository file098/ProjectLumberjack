import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from './../../../services/api.service';
import { AuthService } from './../../../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../../models/user.model';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  isLogged: boolean = false;
  errorMessage: any;
  constructor(
    private _api: ApiService,
    private auth: AuthService,
    private _router: Router
  ) {}

  ngOnInit() {
    this.isLogged = localStorage.getItem('token') != undefined;
  }

  onSubmit(form: NgForm) {
    const user = new User(form.value.username, form.value.password);
    
    this.auth.signIn(user).subscribe((res) => {
      if (res) {
        const token = JSON.stringify(res);
        
        localStorage.setItem('token', token);
        this._router.navigate(['']);
      }
    });
  }

  logout() {
    // this.auth.signOut();
    this._router.navigate(['']);
  }
}
