import { Component } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  loggedIn: boolean = false;
  username!: string | undefined;

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    try {
      this.username = JSON.parse(localStorage.getItem('token')!).username;
    } catch {
      this.username = undefined;
    }

    if (this.username) {
      this.loggedIn = true;
    }
  }

  ngAfterContentInit(): void {
    // this.renderer.listen('')
    const navbarBurgers = Array.prototype.slice.call(
      document.querySelectorAll('.navbar-burger'),
      0
    );
    navbarBurgers.forEach((el) => {
      el.addEventListener('click', () => {
        // Get the target from the "data-target" attribute
        const target = el.dataset.target;
        const target2 = document.getElementById(target)!;

        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        el.classList.toggle('is-active');
        target2.classList.toggle('is-active');
      });
    });
  }

  singOut() {
    this.auth
      .signOut(this.username!)
      .subscribe((res) => (this.loggedIn = false));
  }
}
