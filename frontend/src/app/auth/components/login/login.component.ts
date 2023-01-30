import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
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
  myForm!: FormGroup;

  constructor(
    private auth: AuthService,
    private _router: Router,
    private fb: FormBuilder
  ) {
    this.createForm();
  }

  createForm() {
    this.myForm = this.fb.group({
      username: ['', Validators.required],
    });
  }

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
