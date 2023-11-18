import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  Form,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AccountRegister } from 'src/app/models/account';
import { AccountService } from 'src/app/services/account.service';
interface Role {
  name: string;
  code: string;
}
@Component({
  selector: 'app-account-regiter',
  templateUrl: './account-regiter.component.html',
  styleUrls: ['./account-regiter.component.scss'],
})
export class AccountRegiterComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({});
  loading: boolean = false;
  roles: Role[] | undefined;
  selectedRole: any;
  cbkPassword: boolean = true;
  isInvalidPassword = false;
  constructor(
    private accountService: AccountService,
    private messageService: MessageService,
    private router: Router
  ) {}
  ngOnInit() {
    this.registerForm = new FormGroup({
      fullName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      company: new FormControl('', [Validators.required]),
      password: new FormControl(''),
      role: new FormControl(),
    });
    this.roles = [
      { name: 'Hr', code: 'Hr' },
      { name: 'Customer', code: 'Customer' },
    ];
  }

  registerAccount() {
    this.registerForm.value.role = this.registerForm.value.role.name || 'Hr';
    const account = this.registerForm.value as AccountRegister;
    this.accountService.registerAccount(account).subscribe(
      (reponse) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `Register successfully!`,
        });
        setTimeout(() => {
          if (this.registerForm.value.role == 'Hr')
            this.router.navigate(['/hr']);
          else this.router.navigate(['/customer']);
        }, 1000);
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error.error.message,
        });
      }
    );
  }

  ckbGeneratePasswordSeleted(event: any) {
    this.cbkPassword = this.cbkPassword ? false : true;
    if (this.cbkPassword) {
      this.registerForm.get('password')?.setValue('');
    }
    this.onPasswordChange();
  }
  onPasswordChange() {
    const passwordValue = this.registerForm.get('password')?.value;
    if (passwordValue.length < 8 || (!this.cbkPassword && passwordValue == ''))
      this.isInvalidPassword = true;
    else this.isInvalidPassword = false;
  }
}
