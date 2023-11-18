import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { CurriculumVitae } from 'src/app/models/curriculumvitae';
import { CurriculumVitaeService } from 'src/app/services/curriculum-vitae.service';

@Component({
  selector: 'app-cv-list',
  templateUrl: './cv-list.component.html',
  styleUrls: ['./cv-list.component.scss'],
})
export class CvListComponent {
  curriculumVitaes!: CurriculumVitae[];
  selectedCurriculumVitaes!: CurriculumVitae[];
  selectedFileId!: number;
  selectedFileName!: string;
  selectedFileUrl!: string;
  formGroup: FormGroup = new FormGroup({});
  filteredCustomers!: CurriculumVitae[];
  checkBoxSelected = false;
  isDisplaySendCVModal = false;
  isDisplayViewFileModal = false;
  isRenameFormVisible = false;
  first = 0;
  rows = 7;
  visible: boolean = false;
  role!: string;
  constructor(
    private curriculumnVitaeService: CurriculumVitaeService,
    private messageService: MessageService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.role = localStorage.getItem('role') + '';
    this.getAllCurriculumVitae();
    this.checkFileIdInput();
  }
  checkFileIdInput() {
    this.activatedRoute.queryParams.subscribe((params) => {
      if (params['id'] != null) {
        this.selectedFileId = params['id'];
        this.curriculumnVitaeService
          .getAllCurriculumVitaeById(this.selectedFileId)
          .subscribe((response) => {
            this.selectedFileUrl = response.fileUrl;
          });
        this.viewFile(this.selectedFileId, this.selectedFileUrl);
      }
    });
  }
  getAllCurriculumVitae() {
    this.curriculumnVitaeService
      .getAllCurriculumVitae()
      .subscribe((data: any) => {
        this.curriculumVitaes = data.map((item: any) => {
          return {
            id: item.id,
            name: item.name,
            url: item.fileUrl,
            poster: item.poster.fullName,
            uploadDate: new Date(item.uploadDate),
            status: item.status,
          } as CurriculumVitae;
        });
      });
  }

  showSendCurriculumVitaeModal() {
    this.isDisplaySendCVModal = true;
  }
  filterCustomer(event: AutoCompleteCompleteEvent) {
    let selectedCurriculumVitaes: any[] = [];
    let query = event.query;
    for (let i = 0; i < (this.curriculumVitaes as any[]).length; i++) {
      let country = (this.curriculumVitaes as any[])[i];
      if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        selectedCurriculumVitaes.push(country);
      }
    }
    this.selectedCurriculumVitaes = selectedCurriculumVitaes;
  }

  onCheckboxChange() {
    if (this.selectedCurriculumVitaes.length > 0) this.checkBoxSelected = true;
    else this.checkBoxSelected = false;
  }
  closeSendCvModal(isClosed: boolean) {
    this.isDisplaySendCVModal = false;
  }
  checkSendStatus(isSended: boolean) {
    if (isSended == true) {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'You have sent cv successfully',
      });
    } else
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Server has some error, please try it later!',
      });
  }
  viewFile(fileId: number, fileUrl: string) {
    this.selectedFileId = fileId;
    this.selectedFileUrl = fileUrl;
    this.isDisplayViewFileModal = true;
  }
  deleteFile(fileId: number) {
    this.curriculumnVitaeService.deleteFileOfHumanResource(fileId).subscribe(
      () => {
        this.getAllCurriculumVitae();
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'You have delete cv successfully',
        });
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Server has some error, please try it later!',
        });
      }
    );
  }
  openRenameForm(id: number, fileName: string) {
    this.selectedFileId = id;
    this.selectedFileName = fileName.split('.')[0];
    this.isRenameFormVisible = true;
  }
  renameFile() {
    console.log(this.selectedFileId, this.selectedFileName);
    this.curriculumnVitaeService
      .renameFile(this.selectedFileId, this.selectedFileName)
      .subscribe(
        (response) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Rename file successfully!',
          });
          this.getAllCurriculumVitae();
          this.isRenameFormVisible = false;
        },
        (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Server has error. Please try it later!',
          });
        }
      );
  }
  clodeViewFileModel(isClose: boolean) {
    this.getAllCurriculumVitae();
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
    return this.curriculumVitaes
      ? this.first === this.curriculumVitaes.length - this.rows
      : true;
  }

  isFirstPage(): boolean {
    return this.curriculumVitaes ? this.first === 0 : true;
  }
}
