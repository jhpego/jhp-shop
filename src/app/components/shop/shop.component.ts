import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import {
  ProductCategoryKind,
  ProductUnitKind,
  ShopItem,
  ShopListMode,
} from '../../models/models';
import { ShopListComponent } from '../shop-list/shop-list.component';
import { ShopItemsService } from '../../services/shop-items.service';
import { AppService } from '../../services/app.service';
import { SwipablePageComponent } from '../../pipes/swipe-page.directive';
import { catchError, of, throwError } from 'rxjs';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopComponent extends SwipablePageComponent {
  // @Output() change: EventEmitter<ShopItem> = new EventEmitter();
  constructor(
    private shopItemsService: ShopItemsService,
    public override cdr: ChangeDetectorRef,
    appService: AppService
  ) {
    super(appService, cdr);
  }

  @ViewChild('aquired') shopListComponentAquired!: ShopListComponent;

  ShopListMode = ShopListMode;
  itemsList: ShopItem[] = [];

  override ngOnInit() {
    super.ngOnInit();

    this.pages = [
      ShopListMode.Discarded,
      ShopListMode.Planned,
      ShopListMode.Aquired,
    ];

    this.currPageIdx = 1;

    this.initShopItems();

    this.shopItemsService.shopListUpdated$.subscribe((shopListAction) => {
      console.warn('shopListAction detected in shop');

      if (shopListAction.action === 'create') {
        this.itemsList.push(shopListAction.payload as ShopItem);
      } else if (shopListAction.action === 'remove') {
        this.itemsList = this.itemsList.filter(
          (item) => item.fireId !== shopListAction.payload?.fireId
        );
      }

      this.saveShopItems();
      this.cdr.detectChanges();
    });
  }

  getShopItemsFromLocalstorage() {
    const localShopItems = this.loadShopItems();
    if (localShopItems == null) {
      return throwError(() => new Error('test'));
    }
    return of(localShopItems);
  }

  initShopItems() {
    this.getShopItemsFromLocalstorage()
      .pipe(
        catchError((err) => {
          return this.shopItemsService.getItemsCombined();
        })
      )
      .subscribe((res) => {
        this.itemsList = res;
        this.cdr.detectChanges();
      });
  }

  public get itemsTotal() {
    console.warn('calc shop total: ');
    return this.getFilteredItems(ShopListMode.Aquired).reduce(
      (prev, curr) => prev + curr.price * curr.quantity,
      0
    );
    return 0;
  }

  getFilteredItems(mode: ShopListMode) {
    return this.itemsList.filter((item) => item.status == mode);
  }

  changeMode(modeIdx: any) {
    this.currPageIdx = modeIdx;
  }

  loadShopItems() {
    const currShopJson = localStorage.getItem('currShop');
    const currShop = JSON.parse(currShopJson as string);
    return currShop;
  }

  saveShopItems() {
    const currShop = this.itemsList;
    const currShopJson = JSON.stringify(currShop);
    localStorage.setItem('currShop', currShopJson);
  }

  ngOnDestroy() {
    this.saveShopItems();
  }
}
