import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { CvListComponent } from './components/cv-list/cv-list.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { LoginComponent } from './components/login/login.component';
import { AccountRegiterComponent } from './components/account-regiter/account-regiter.component';
import { AccountListComponent } from './components/account-list/account-list.component';
import { AssignCustomerComponent } from './components/assign-customer/assign-customer.component';
import { CustomerCvViewlogComponent } from './components/customer-cv-viewlog/customer-cv-viewlog.component';
import { HrViewDetailComponent } from './components/hr-view-detail/hr-view-detail.component';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { AuthGuard } from './guards/auth.guard';
import { AuthChildGuard } from './guards/auth-child';
import { PasswordResetComponent } from './components/forget-password/password-reset/password-reset.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { OtpSendComponent } from './components/forget-password/otp-send/otp-send.component';
import { OtpValidateComponent } from './components/forget-password/otp-validate/otp-validate.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    canActivateChild: [AuthChildGuard],
    children: [
      {
        path: 'cv',
        component: CvListComponent,
      },
      {
        path: '',
        component: CvListComponent,
      },
      {
        path: 'customer',
        component: AccountListComponent,
      },
      {
        path: 'hr',
        component: AccountListComponent,
      },
      {
        path: 'account/create',
        component: AccountRegiterComponent,
      },
      {
        path: 'customer/view/:id',
        component: CustomerCvViewlogComponent,
      },
      {
        path: 'hr/view/:id',
        component: HrViewDetailComponent,
      },
      {
        path: 'upload-file',
        component: FileUploadComponent,
      },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '',
    component: ForgetPasswordComponent,
    children: [
      {
        path: 'forget-password',
        component: OtpSendComponent,
      },
      {
        path: 'otp-validate',
        component: OtpValidateComponent,
      },
      {
        path: 'password-reset',
        component: PasswordResetComponent,
      },
    ],
  },
  {
    path: 'forbidden',
    component: ForbiddenComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
