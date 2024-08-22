import { Component, Input } from '@angular/core';

export type TypeNotification = 'success' | 'info' | 'error';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent {
  @Input() message: string = '';
  @Input() type: TypeNotification;
  @Input() visible: boolean = false;

  icon: string;

  ngOnChanges() {
    switch(this.type) {
      case 'success': 
          this.icon = 'fa-circle-check';
        break;
      case 'error': 
          this.icon = 'fa-circle-xmark';
        break;
      default:
        this.icon = 'fa-circle-info';
    }


    if (!this.visible) {
      setTimeout(() => this.visible = false, 3000);
    }
  }
}
