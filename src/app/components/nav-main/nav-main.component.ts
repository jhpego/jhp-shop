import { Component, EventEmitter, Output } from '@angular/core';
import { MenuEntry } from '../../models/models';

@Component({
  selector: 'app-nav-main',
  templateUrl: './nav-main.component.html',
  styleUrls: ['./nav-main.component.scss'],
})
export class NavMainComponent {
  @Output() navigated: EventEmitter<string> = new EventEmitter();

  menu: MenuEntry[] = [
    {
      path: 'home',
      identifier: 'home',
      icon: 'home',
    },
    {
      path: 'shop',
      identifier: 'shop',
      icon: 'shopping_cart',
    },
  ];
}
