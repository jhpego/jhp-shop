import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-jhp-toolbar',
  templateUrl: './jhp-toolbar.component.html',
  styleUrls: ['./jhp-toolbar.component.scss'],
})
export class JhpToolbarComponent {
  @Output() buttonClick: EventEmitter<string> = new EventEmitter();

  onButtonClick(button: string) {
    console.warn('menu clicked');

    this.buttonClick.emit(button);
  }

  onLongClick() {
    alert('long');
  }
}
