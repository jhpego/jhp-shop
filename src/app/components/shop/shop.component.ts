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

    this.shopItemsService.itemsList$.subscribe((res) => {
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
}
