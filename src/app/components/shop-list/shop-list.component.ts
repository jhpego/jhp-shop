import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import {
  ProductCategoryKind,
  ShopItem,
  ShopListMode,
} from '../../models/models';
import { ShopItemsService } from 'src/app/services/shop-items.service';

@Component({
  selector: 'app-shop-list',
  templateUrl: './shop-list.component.html',
  styleUrls: ['./shop-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopListComponent {
  constructor() // private shopItemsService: ShopItemsService,
  // private cdr: ChangeDetectorRef
  {}
  ProductCategoryKindEnum = ProductCategoryKind;

  @Input() listMode: ShopListMode = ShopListMode.Unset;
  @Input() itemslist: ShopItem[] = [];
  // @Output() change: EventEmitter<ShopItem> = new EventEmitter();

  ShopListModeEnum = ShopListMode;

  public get itemsList() {
    return this.itemslist;
  }

  // onItemChanged(item: ShopItem) {
  //   this.change.emit(item);
  //   this.cdr.markForCheck();
  //   console.log('changed in shop list');
  // }
}
