import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { User } from 'src/app/models/user';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-assign-customer',
  templateUrl: './assign-customer.component.html',
  styleUrls: ['./assign-customer.component.scss'],
})
export class AssignCustomerComponent implements OnInit, OnChanges {
  onHrSelected() {
    if (this.selectedHumanResources.length > 0) this.isSelectedHr = true;
    else this.isSelectedHr = false;
  }
  visible: boolean = true;
  humanResources!: User[];
  selectedHumanResources!: User[];
  loading: boolean = false;
  @Input() isDisplayAssignModal: boolean = true;
  @Input() selectedCustomers: User[] = [];
  @Output() closeEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() isAssigned: EventEmitter<boolean> = new EventEmitter<boolean>();
  isSelectedHr = false;
  constructor(private accountService: AccountService) {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedCustomers'])
      this.selectedCustomers = changes['selectedCustomers'].currentValue;
  }
  ngOnInit(): void {
    this.getAllValidHumanResource();
  }

  getAllValidHumanResource() {
    this.accountService.getAllValidHumanResource().subscribe((response) => {
      this.humanResources = response;
    });
  }

  showDialog() {
    this.visible = true;
  }
  closeAssignModal() {
    this.closeEvent.emit(true);
  }
  assignCustomerToHr() {
    const assignData = {
      hrIds: this.selectedHumanResources.map((hr) => {
        return hr.id;
      }),
      customerIds: this.selectedCustomers.map((customer) => {
        return customer.id;
      }),
    };

    this.accountService.assignCustomerToHumanResource(assignData).subscribe(
      (response) => {
        this.closeEvent.emit(true);
        this.isAssigned.emit(true);
      },
      (error) => {
        this.isAssigned.emit(false);
      }
    );
  }
}
