import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { User } from 'src/app/models/user';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.scss'],
})
export class AccountListComponent {
  accounts: User[] = [];
  selectedAccounts!: User[];
  formGroup: FormGroup = new FormGroup({});
  filteredAccounts!: User[];
  checkBoxSelected: boolean = false;
  first = 0;
  rows = 7;
  visible: boolean = false;
  isCustomerPage: boolean = false;
  isDisplayAssignModal: boolean = false;
  role = localStorage.getItem('role');
  constructor(
    private accountService: AccountService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit() {
    const currentUrl = this.router.url;
    if (currentUrl.endsWith('customer')) {
      this.getAllCustomer();
      this.isCustomerPage = true;
    } else this.getAllHr();
  }

  getAllCustomer() {
    this.accountService.getAllCustomer().subscribe(
      (response) => {
        this.accounts = response;
      },
      (error) => {}
    );
  }
  getAllHr() {
    this.accountService.getAllHumanResource().subscribe(
      (response) => {
        this.accounts = response;
      },
      (error) => {}
    );
  }
  confirmLockOrUnlock(id: number, status: number) {
    this.confirmationService.confirm({
      message: `Are you sure that you want to ${
        status == 0 ? 'unlock' : 'lock'
      } this account?`,
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',

      accept: () => {
        this.lockAndUnlockAccount(id, status);
      },
      reject: () => {},
    });
  }
  lockAndUnlockAccount(id: number, status: number) {
    this.accountService.lockAndUnlockAccount(id).subscribe(
      (response) => {
        if (this.isCustomerPage) this.getAllCustomer();
        else this.getAllHr();
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `You have ${
            status == 0 ? 'unlock' : 'lock'
          } account successfully!`,
        });
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: `Intenal server error!`,
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
    return this.accounts
      ? this.first === this.accounts.length - this.rows
      : true;
  }

  isFirstPage(): boolean {
    return this.accounts ? this.first === 0 : true;
  }

  showAssignModal() {
    this.isDisplayAssignModal = true;
  }
  filterCustomer(event: AutoCompleteCompleteEvent) {
    let selectedCustomers: any[] = [];
    let query = event.query;
    for (let i = 0; i < (this.accounts as any[]).length; i++) {
      let country = (this.accounts as any[])[i];
      if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        selectedCustomers.push(country);
      }
    }

    this.selectedAccounts = selectedCustomers;
  }
  closeAssignModel(isClosed: boolean) {
    this.isDisplayAssignModal = false;
  }
  isAssigned(isAssigned: boolean) {
    if (isAssigned == true)
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: `You have assigned account successfully!`,
      });
    else
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: `Server has error, please try it later!`,
      });
  }
  onCheckboxChange() {
    if (this.selectedAccounts.length > 0) this.checkBoxSelected = true;
    else this.checkBoxSelected = false;
  }
  viewDetailAccount(accountId: number) {
    if (this.isCustomerPage) {
      this.router.navigate([`customer/view/${accountId}`]);
    } else this.router.navigate([`hr/view/${accountId}`]);
  }
}
