import { Component, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { ShopItem } from '../../models/models';

@Component({
  selector: 'app-shop-bottom-sheet',
  templateUrl: './shop-bottom-sheet.component.html',
  styleUrls: ['./shop-bottom-sheet.component.scss'],
})
export class ShopBottomSheetComponent {
  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: { item: ShopItem }) {}
}
