import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-otp-send',
  templateUrl: './otp-send.component.html',
  styleUrls: ['./otp-send.component.scss'],
})
export class OtpSendComponent {
  otpForm: FormGroup = new FormGroup({});
  email!: string;
  constructor(
    private accountService: AccountService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.otpForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  loading: boolean = false;

  sendOtp() {
    if (!this.otpForm.invalid) {
      this.email = this.otpForm.get('email')?.value;
      this.accountService.sendOtp(this.email).subscribe(
        (response) => {},
        (error) => {
          this.messageService.add({
            summary: 'error',
            severity: 'Error',
            detail: 'Server has error, please try it later.',
          });
        }
      );
    }
    this.router.navigate(['/otp-validate'], {
      queryParams: { email: this.email },
    });
  }
}
