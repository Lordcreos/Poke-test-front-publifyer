import { inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private messageService = inject(MessageService);
  private translateService = inject(TranslateService);

  showSuccess(message: string): void {
    this.messageService.add({
      severity: 'success',
      summary: this.translateService.instant('Success'),
      detail: this.translateService.instant(message),
    });
  }

  showError(message: string): void {
    this.messageService.add({
      severity: 'error',
      summary: this.translateService.instant('Error'),
      detail: this.translateService.instant(message),
    });
  }
  showInfo(message: string): void {
    this.messageService.add({
      severity: 'info',
      summary: this.translateService.instant('Info'),
      detail: this.translateService.instant(message),
    });
  }

  showWarn(message: string): void {
    this.messageService.add({
      severity: 'warn',
      summary: this.translateService.instant('Warning'),
      detail: this.translateService.instant(message),
    });
  }
}
