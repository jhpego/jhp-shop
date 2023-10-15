import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-jhp-card',
  templateUrl: './jhp-card.component.html',
  styleUrls: ['./jhp-card.component.scss'],
})
export class JhpCardComponent {
  @Input() imageUrl?: string;
  @Input() textContent?: string;
  @Input() cardMode: CardMode = CardMode.Default;

  CardModeEnum = CardMode;
}

export enum CardMode {
  Default,
  Label,
}
