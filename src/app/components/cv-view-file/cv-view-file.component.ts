import { HttpClient } from '@angular/common/http';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Observable, map } from 'rxjs';
import { CurriculumVitaeService } from 'src/app/services/curriculum-vitae.service';
import { environment } from 'src/enviroment';

@Component({
  selector: 'app-cv-view-file',
  templateUrl: './cv-view-file.component.html',
  styleUrls: ['./cv-view-file.component.scss'],
})
export class CvViewFileComponent implements OnInit, OnChanges {
  @Input() isDisplayViewFileModal!: boolean;
  @Input() selectedFileId!: number;
  @Input() selectedFileUrl!: string;
  @Output() closeEvent: EventEmitter<boolean> = new EventEmitter();
  fileUrl!: string;
  isPdfFile = false;
  isLoading = true;
  @ViewChild('pdfViewer') pdfViewer!: ElementRef;
  constructor(
    private curriculumVitaeService: CurriculumVitaeService,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedFileId'] || changes['selectedFileUrl']) {
      this.selectedFileId = changes['selectedFileId'].currentValue;
      this.selectedFileUrl = changes['selectedFileUrl'].currentValue;
      this.viewFile();
    }
  }
  viewFile() {
    this.curriculumVitaeService.viewFile(this.selectedFileId).subscribe(
      (response) => {
        console.log(response);
        if (response.type == 'application/pdf') {
          this.fileUrl = URL.createObjectURL(response);
          this.isPdfFile = true;
        }
        setTimeout(() => {
          this.isLoading = false;
          console.log('');
        }, 800);
      },
      (error) => {
        if (error.status == 403) {
          this.router.navigateByUrl('/forbidden');
        } else
          this.messageService.add({
            summary: 'error',
            severity: 'Error',
            detail: 'Server has error, please try it later',
          });
      }
    );
  }

  ngOnInit(): void {}

  closeViewFileModal() {
    this.closeEvent.emit(true);
  }
}
