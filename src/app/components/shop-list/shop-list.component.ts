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
import { ShopItemsService } from '../../services/shop-items.service';

@Component({
  selector: 'app-shop-list',
  templateUrl: './shop-list.component.html',
  styleUrls: ['./shop-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopListComponent {
  constructor(
    private cdr: ChangeDetectorRef,
    private shopItemsService: ShopItemsService
  ) {} // private cdr: ChangeDetectorRef // ,
  ProductCategoryKindEnum = ProductCategoryKind;

  @Input() listMode: ShopListMode = ShopListMode.Unset;
  @Input() itemslist: ShopItem[] = [];
  // @Output() change: EventEmitter<ShopItem> = new EventEmitter();

  ngOnInit() {
    // this.shopItemsService.shopItemUpdated$.subscribe((shopItem: ShopItem) => {
    //   debugger;
    //   // this.item = shopItem;
    //   this.cdr.detectChanges();
    // });
  }

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

  onItemChanged(item: any) {
    // this.change.emit(item);
    this.cdr.detectChanges();
    console.log('changed in shop list');
  }
}
