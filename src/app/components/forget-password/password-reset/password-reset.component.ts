import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss'],
})
export class PasswordResetComponent {
  resetPasswordForm: FormGroup = new FormGroup({});
  email!: string;
  isLogin!: string;
  constructor(
    private accountService: AccountService,
    private messageService: MessageService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(
      (params) => (this.email = params['email'])
    );
    this.resetPasswordForm = new FormGroup({
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      rePassword: new FormControl('', [
        Validators.required,
        this.validateRePassword(),
      ]),
    });
  }
  validateRePassword(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return this.resetPasswordForm.get('password')?.value !==
        this.resetPasswordForm.get('rePassword')?.value
        ? { dontMatch: { value: control.value } }
        : null;
    };
  }
  loading: boolean = false;

  resetPassword() {
    if (!this.resetPasswordForm.invalid) {
      this.loading = true;
      const resetPasswordObj = {
        email: this.email,
        newPassword: this.resetPasswordForm.get('password')?.value,
      };
      this.accountService.resetPassword(resetPasswordObj).subscribe(
        (response) => {
          this.messageService.add({
            summary: 'success',
            severity: 'success',
            detail: 'You have reset pasword successfully',
          });
          setTimeout(() => {
            if (this.isLogin) this.router.navigateByUrl('login');
            else this.router.navigateByUrl('login');
          }, 1000);
        },
        (error) => {
          this.messageService.add({
            summary: 'error',
            severity: 'error',
            detail: 'Server has error, please try it later',
          });
        }
      );
    }
  }
}
