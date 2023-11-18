import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CvPageComponent } from './page/cv-page/cv-page.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { MenuModule } from 'primeng/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CvListComponent } from './components/cv-list/cv-list.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ModelComponent } from './components/model/model.component';
import { DialogModule } from 'primeng/dialog';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './services/interceptor.interceptor';
import { AccountListComponent } from './components/account-list/account-list.component';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { MultiSelectModule } from 'primeng/multiselect';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { AccountRegiterComponent } from './components/account-regiter/account-regiter.component';
import { AssignCustomerComponent } from './components/assign-customer/assign-customer.component';
import { VirtualScrollerModule } from 'primeng/virtualscroller';
import { CustomerCvViewlogComponent } from './components/customer-cv-viewlog/customer-cv-viewlog.component';
import { CvSendToCustomerComponent } from './components/cv-send-to-customer/cv-send-to-customer.component';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { CvViewFileComponent } from './components/cv-view-file/cv-view-file.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { HrViewDetailComponent } from './components/hr-view-detail/hr-view-detail.component';
import { TabViewModule } from 'primeng/tabview';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { NotificationComponent } from './components/notification/notification.component';
import { NoDataComponent } from './components/no-data/no-data.component';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TooltipModule } from 'primeng/tooltip';
import { SplitButtonModule } from 'primeng/splitbutton';
import { OtpSendComponent } from './components/forget-password/otp-send/otp-send.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { StepsModule } from 'primeng/steps';
import { PasswordResetComponent } from './components/forget-password/password-reset/password-reset.component';
import { OtpValidateComponent } from './components/forget-password/otp-validate/otp-validate.component';
@NgModule({
  declarations: [
    AppComponent,
    CvPageComponent,
    MainLayoutComponent,
    CvListComponent,
    FileUploadComponent,
    ModelComponent,
    LoginComponent,
    AccountRegiterComponent,
    AccountListComponent,
    AssignCustomerComponent,
    CustomerCvViewlogComponent,
    CvSendToCustomerComponent,
    CvViewFileComponent,
    HrViewDetailComponent,
    ForbiddenComponent,
    NotificationComponent,
    NoDataComponent,
    OtpSendComponent,
    ForgetPasswordComponent,
    PasswordResetComponent,
    OtpValidateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MenuModule,
    BrowserAnimationsModule,
    SplitButtonModule,
    TableModule,
    ButtonModule,
    FileUploadModule,
    RadioButtonModule,
    ToastModule,
    DialogModule,
    AutoCompleteModule,
    ReactiveFormsModule,
    TooltipModule,
    InputTextModule,
    StepsModule,
    FormsModule,
    ConfirmDialogModule,
    DropdownModule,
    OverlayPanelModule,
    CheckboxModule,
    MultiSelectModule,
    VirtualScrollerModule,
    PdfViewerModule,
    TabViewModule,
    NgxDocViewerModule,
    ProgressSpinnerModule,
  ],
  providers: [
    MessageService,
    ConfirmationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
