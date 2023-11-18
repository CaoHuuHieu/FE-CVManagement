import { Component, ElementRef, ViewChild } from '@angular/core';
import { Route, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CurriculumVitaeService } from 'src/app/services/curriculum-vitae.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  providers: [MessageService],
})
export class FileUploadComponent {
  @ViewChild('fileInput', { static: true }) fileInput!: ElementRef;
  uploadFiles: File[] = [];
  numberOfFileAllowed: number = 5;
  isLoading = false;
  constructor(
    private messageService: MessageService,
    private curriculumVitaeService: CurriculumVitaeService,
    private router: Router
  ) {}

  onFileSelected(event: any) {
    let length = this.uploadFiles.length;
    let i = length;
    if (
      event.target.files.length > this.numberOfFileAllowed ||
      (event.target.files.length != 0 &&
        this.uploadFiles.length == this.numberOfFileAllowed)
    )
      this.messageService.add({
        severity: 'info',
        summary: 'Warning',
        detail: `Cannot upload more than ${this.numberOfFileAllowed} files!`,
      });

    for (; i < this.numberOfFileAllowed; i++) {
      const file = event.target.files[i - length];
      if (file !== undefined && this.validateFile(file))
        this.uploadFiles.push(event.target.files[i - length]);
      else break;
    }
  }

  validateFile(file: File): boolean {
    const allowedMimeTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];
    if (!allowedMimeTypes.includes(file.type)) {
      this.messageService.add({
        severity: 'error',
        summary: 'Warning',
        detail: `${file.name} is not supported!`,
      });
      return false;
    }
    const maxSize = 2 * 1024 * 1024; // 2 MB
    if (file.size > maxSize) {
      this.messageService.add({
        severity: 'error',
        summary: 'Warning',
        detail: `${file.name} is too large!`,
      });
      return false;
    }

    return true;
  }
  chooseFile() {
    this.fileInput.nativeElement.click();
  }
  deleteFile(index: any) {
    console.log(index);
    if (index > -1 && index < this.uploadFiles.length) {
      this.uploadFiles.splice(index, 1);
    } else if (index === this.uploadFiles.length) {
      this.uploadFiles = [];
    }
  }
  uploadCV() {
    this.isLoading = true;
    const formData = new FormData();
    this.uploadFiles.forEach((file) => formData.append('file', file));
    this.curriculumVitaeService.uploadFiles(formData).subscribe(
      (response) => {
        this.isLoading = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `Upload file successfully!`,
        });
        setTimeout(() => {
          this.router.navigate(['/cv']);
        }, 1000);
      },
      (error) => {
        this.isLoading = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: `Intenal server error!`,
        });
      }
    );
  }
}
