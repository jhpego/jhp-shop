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

@Component({
  selector: 'app-shop-list',
  templateUrl: './shop-list.component.html',
  styleUrls: ['./shop-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopListComponent {
  constructor() {} // private cdr: ChangeDetectorRef // private shopItemsService: ShopItemsService,
  ProductCategoryKindEnum = ProductCategoryKind;

  @Input() listMode: ShopListMode = ShopListMode.Unset;
  @Input() itemslist: ShopItem[] = [];
  // @Output() change: EventEmitter<ShopItem> = new EventEmitter();

  ShopListModeEnum = ShopListMode;

  public get itemsList() {
    return this.itemslist;
  }

  public get total() {
    return this.itemsList.reduce(
      (prev, curr) => prev + curr.price * curr.quantity,
      0
    );
  }

  // onItemChanged(item: ShopItem) {
  //   this.change.emit(item);
  //   this.cdr.markForCheck();
  //   console.log('changed in shop list');
  // }
}
