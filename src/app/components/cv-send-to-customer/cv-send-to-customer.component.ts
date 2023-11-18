import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CurriculumVitae } from 'src/app/models/curriculumvitae';
import { User } from 'src/app/models/user';
import { AccountService } from 'src/app/services/account.service';
import { CurriculumVitaeService } from 'src/app/services/curriculum-vitae.service';

@Component({
  selector: 'app-cv-send-to-customer',
  templateUrl: './cv-send-to-customer.component.html',
  styleUrls: ['./cv-send-to-customer.component.scss'],
})
export class CvSendToCustomerComponent {
  visible: boolean = true;
  customers!: User[];
  selectedCustomers: User[] = [];
  loading: boolean = false;
  isSelectedAll = false;
  reminderIntervalTimes: number[] = [1, 2, 3, 4, 5, 6, 7];
  selectedTime!: number;
  @Input() isDisplaySendCVModal: boolean = false;
  @Input() seletedCurriculumnVitaes: CurriculumVitae[] = [];
  @Output() closeEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() isSended: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(
    private accountService: AccountService,
    private curriculumService: CurriculumVitaeService
  ) {}
  ngOnInit(): void {
    this.getAllCustomerOfHumanResouce();
  }

  getAllCustomerOfHumanResouce() {
    this.accountService.getAllCustomer().subscribe((response) => {
      this.customers = response;
    });
  }

  closeSendEmailModal() {
    this.closeEvent.emit(true);
  }
  checkSelected() {
    if (this.selectedCustomers.length != 0 && this.selectedTime != null)
      this.isSelectedAll = true;
    else this.isSelectedAll = false;
  }
  sendCurriculumToCustomer() {
    this.loading = true;
    const emailSendData = {
      userIds: this.selectedCustomers.map((customer) => {
        return customer.id;
      }),
      cvIds: this.seletedCurriculumnVitaes.map((cv) => {
        return cv.id;
      }),
      reminderInterval: this.selectedTime,
    };

    this.curriculumService.sendCurriculumToCustomer(emailSendData).subscribe(
      (response) => {
        this.closeEvent.emit(true);
        this.isSended.emit(true);
      },
      (error) => {
        this.isSended.emit(false);
      }
    );
  }
}
