import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { CurriculumnvitaeViewlog } from 'src/app/models/curriculumnvitae-viewlog';
import { CurriculumVitae } from 'src/app/models/curriculumvitae';
import { User } from 'src/app/models/user';
import { AccountService } from 'src/app/services/account.service';
import { CurriculumVitaeService } from 'src/app/services/curriculum-vitae.service';

@Component({
  selector: 'app-customer-cv-viewlog',
  templateUrl: './customer-cv-viewlog.component.html',
  styleUrls: ['./customer-cv-viewlog.component.scss'],
})
export class CustomerCvViewlogComponent {
  curriculumVitaes!: CurriculumnvitaeViewlog[];
  filterCurriculumVitaes!: CurriculumnvitaeViewlog[];
  isDisplayViewFileModal: boolean = false;
  selectedFileId!: number;
  selectedFileUrl!: string;
  customer: User = new User();
  first = 0;
  rows = 7;
  visible: boolean = false;
  customerId!: number;
  role!: string;
  constructor(
    private accountService: AccountService,
    private curriculumnVitaeService: CurriculumVitaeService,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.role = localStorage.getItem('role') + '';
    this.route.params.subscribe((params) => {
      this.customerId = params['id'];
    });
    this.getCustomerInfor();
    this.getAllCurriculumVitaeOfCustomer();
  }
  getCustomerInfor() {
    this.accountService
      .getAccountById(this.customerId)
      .subscribe((response) => {
        this.customer = response;
      });
  }
  getAllCurriculumVitaeOfCustomer() {
    this.curriculumnVitaeService
      .getAllCurriculumVitaeOfCustomer(this.customerId)
      .subscribe((data: any) => {
        this.curriculumVitaes = data.map((cv: any) => {
          return {
            id: cv.curriculumVitae.id,
            name: cv.curriculumVitae.name,
            poster: cv.curriculumVitae.poster.fullName,
            company: cv.curriculumVitae.poster.company,
            views: cv.views,
            lastView: cv.lastView,
          } as CurriculumnvitaeViewlog;
        });
      });
  }
  deleteFileOfCustomer(cvId: number) {
    this.curriculumnVitaeService
      .deleleFileOfCustomer(this.customerId, cvId)
      .subscribe(
        (response) => {
          this.getAllCurriculumVitaeOfCustomer();
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'You have delete one cv successfully!',
          });
        },
        (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'server has error, please try it later!',
          });
        }
      );
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
    return this.curriculumVitaes
      ? this.first === this.curriculumVitaes.length - this.rows
      : true;
  }

  isFirstPage(): boolean {
    return this.curriculumVitaes ? this.first === 0 : true;
  }

  blockAccount(id: number, status: number) {
    this.accountService.lockAndUnlockAccount(id).subscribe(
      (response) => {
        this.getCustomerInfor();
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
  viewFile(fileId: number, fileUrl: string) {
    this.selectedFileId = fileId;
    this.selectedFileUrl = fileUrl;
    this.isDisplayViewFileModal = true;
  }
  clodeViewFileModel(isClose: boolean) {
    this.isDisplayViewFileModal = false;
  }
  filterCurriculumVitae(event: AutoCompleteCompleteEvent) {
    let filterCurriculumVitaes: any[] = [];
    let query = event.query;
    for (let i = 0; i < (this.curriculumVitaes as any[]).length; i++) {
      let country = (this.curriculumVitaes as any[])[i];
      if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filterCurriculumVitaes.push(country);
      }
    }

    this.filterCurriculumVitaes = filterCurriculumVitaes;
  }
}
