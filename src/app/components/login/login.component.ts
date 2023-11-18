import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Account } from 'src/app/models/account';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  account!: Account;
  returnUrl!: string;
  constructor(
    private accountService: AccountService,
    private messageService: MessageService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [
        Validators.minLength(8),
        Validators.required,
      ]),
    });
    this.activatedRoute.queryParams.subscribe((params) => {
      if (params['returnUrl']) this.returnUrl = params['returnUrl'];
    });
  }

  loading: boolean = false;

  login() {
    if (!this.loginForm.invalid) {
      this.loading = true;

      this.accountService.login(this.loginForm.value).subscribe(
        (reponse) => {
          this.loading = false;
          localStorage.setItem('token', reponse.token);
          localStorage.setItem('fullName', reponse.fullName);
          localStorage.setItem('role', reponse.role);
          setTimeout(() => {
            if (this.returnUrl) {
              this.router.navigate(['/cv'], {
                queryParams: { id: this.returnUrl.split('=')[1] },
              });
            } else if (reponse.status == 1)
              this.router.navigate(['/password-reset'], {
                queryParams: { email: reponse.email },
              });
            else this.router.navigate(['/cv']);
          }, 1000);
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: `Login successfully!`,
          });
        },
        (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: `Email or password is invalid!`,
          });
          this.loading = false;
        }
      );
    }
  }
}
