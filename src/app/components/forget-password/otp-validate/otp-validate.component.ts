import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-otp-validate',
  templateUrl: './otp-validate.component.html',
  styleUrls: ['./otp-validate.component.scss'],
})
export class OtpValidateComponent {
  otpForm: FormGroup = new FormGroup({});
  loading: boolean = false;
  email!: string;
  isOtpValid = false;
  isResendClick = false;
  constructor(
    private accountService: AccountService,
    private messageService: MessageService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.otpForm = new FormGroup({
      otp: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
    this.activatedRoute.queryParams.subscribe((params) => {
      this.email = params['email'];
    });
  }

  validateOtp() {
    if (!this.otpForm.invalid) {
      this.isOtpValid = true;
      const otpValidate = {
        email: this.email,
        otp: this.otpForm.get('otp')?.value,
      };
      this.accountService.validateOtp(otpValidate).subscribe(
        (response) => {
          this.router.navigate(['password-reset'], {
            queryParams: { email: this.email },
          });
        },
        (error) => {
          this.isOtpValid = true;
        }
      );
    }
  }
  resendOtp() {
    this.isResendClick = true;
    setTimeout(() => {
      this.isResendClick = false;
    }, 5000);
    if (this.isResendClick)
      this.messageService.add({
        severity: 'warn',
        summary: 'Warning',
        detail:
          'We have send you a OTP, please check your mail or wait 60 second!',
      });
    this.accountService.sendOtp(this.email).subscribe(
      (response) => {},
      (error) => {
        this.isOtpValid = true;
      }
    );
  }
}
