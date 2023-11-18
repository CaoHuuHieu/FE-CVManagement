import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
})
export class MainLayoutComponent {
  fullName = localStorage.getItem('fullName');
  role = localStorage.getItem('role');
  isAccountClick = false;
  constructor(private router: Router) {}
  accountClick() {
    this.isAccountClick = !this.isAccountClick;
  }
  logOut() {
    localStorage.clear();
    this.router.navigateByUrl('login');
  }
}
