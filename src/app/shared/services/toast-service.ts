import { inject, Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

type ToastSeverity = 'success' | 'info' | 'warn' | 'error' | 'secondary' | 'contrast';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private readonly messageService = inject(MessageService);

  private assignSummaryFromSeverity(severity: ToastSeverity): string | undefined {
    switch (severity) {
      case 'success':
        return 'Exito';
      case 'info':
        return 'Información';
      case 'warn':
        return 'Advertencia';
      case 'error':
        return 'Error';
      default:
        return undefined;
    }
  }

  public showToast(severity: ToastSeverity, detail: string, summary?: string) {
    if (!summary) summary = this.assignSummaryFromSeverity(severity);
    this.messageService.add({
      severity,
      detail,
      summary,
    });
  }
}
