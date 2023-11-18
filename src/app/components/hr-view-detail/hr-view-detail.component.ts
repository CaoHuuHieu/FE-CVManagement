import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CurriculumVitae } from 'src/app/models/curriculumvitae';
import { User } from 'src/app/models/user';
import { AccountService } from 'src/app/services/account.service';
import { CurriculumVitaeService } from 'src/app/services/curriculum-vitae.service';

@Component({
  selector: 'app-hr-view-detail',
  templateUrl: './hr-view-detail.component.html',
  styleUrls: ['./hr-view-detail.component.scss'],
})
export class HrViewDetailComponent implements OnInit {
  customerOfHrs!: User[];
  curriculumVitaesOfHr!: CurriculumVitae[];
  filteredCustomers!: User[];
  isDisplayViewFileModal: boolean = false;
  selectedFileViewId!: number;
  first = 0;
  rows = 7;
  hrId!: number;
  hr: User = new User();
  role!: string;
  selectedFileUrl!: string;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private accountService: AccountService,
    private messageService: MessageService,
    private curriculumService: CurriculumVitaeService
  ) {}
  ngOnInit(): void {
    this.role = localStorage.getItem('role') + '';
    this.route.params.subscribe((params) => {
      this.hrId = params['id'];
    });
    this.getAllDataOfHr();
    this.getHrInfor();
  }
  getHrInfor() {
    this.accountService.getAccountById(this.hrId).subscribe((response) => {
      this.hr = response;
    });
  }
  getAllDataOfHr() {
    this.accountService.getDetailOfHumanResource(this.hrId).subscribe(
      (response) => {
        this.customerOfHrs = response.customers;
        this.curriculumVitaesOfHr = response.curriculumVitaes;
      },
      (errror) => {}
    );
  }
  blockAccount(id: number, status: number) {
    this.accountService.lockAndUnlockAccount(id).subscribe(
      (response) => {
        this.getHrInfor();
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `You have ${
            status == 0 ? 'unlock' : 'lock'
          } this account successfully!`,
        });
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Server has error, please try it later!',
        });
      }
    );
  }
  deleteCustomerOfHr(customerId: number) {
    this.accountService.deleteCustomerOfHr(this.hrId, customerId).subscribe(
      (response) => {
        this.getAllDataOfHr();
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `You have delete customer of this hr!`,
        });
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Server has error, please try it later!',
        });
      }
    );
  }
  deleteCvOfHr(cvId: number) {
    this.curriculumService.deleteFileOfHumanResource(cvId).subscribe(
      (response) => {
        this.getAllDataOfHr();
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `You have delete cv of this hr!`,
        });
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Server has error, please try it later!',
        });
      }
    );
  }
  viewDetailAccount(customerId: number) {
    this.router.navigateByUrl(`customer/view/${customerId}`);
  }

  viewFile(fileId: number, fileUrl: string) {
    this.selectedFileViewId = fileId;
    this.selectedFileUrl = fileUrl;
    this.isDisplayViewFileModal = true;
  }
  clodeViewFileModel(isClose: boolean) {
    this.isDisplayViewFileModal = false;
  }

  next() {
    this.first = this.first + this.rows;
  }

  prev() {
    this.first = this.first - this.rows;
  }

  reset() {
    this.first = 0;
  }

  pageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
  }

  isLastPage(): boolean {
    return this.customerOfHrs
      ? this.first === this.customerOfHrs.length - this.rows
      : true;
  }

  isFirstPage(): boolean {
    return this.customerOfHrs ? this.first === 0 : true;
  }
}
