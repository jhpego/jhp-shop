import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-jhp-toolbar',
  templateUrl: './jhp-toolbar.component.html',
  styleUrls: ['./jhp-toolbar.component.scss'],
})
export class JhpToolbarComponent {
  @Input() icon: string | null = null;
  @Input() title: string | null = null;
  @Input() menuPosition: ToolbarMenuPosition | null = null;
  @Output() buttonClick: EventEmitter<string> = new EventEmitter();

  ToolbarMenuPositionEnum = ToolbarMenuPosition;

  onButtonClick(button: string) {
    console.warn('menu clicked');

    this.buttonClick.emit(button);
  }

  onLongClick() {
    alert('long');
  }
}

export enum ToolbarMenuPosition {
  Left,
  Right,
}
