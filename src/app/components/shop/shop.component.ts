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

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopComponent {
  // @Output() change: EventEmitter<ShopItem> = new EventEmitter();
  constructor(
    private shopItemsService: ShopItemsService,
    private cdr: ChangeDetectorRef
  ) {}

  @ViewChild('aquired') shopListComponentAquired!: ShopListComponent;

  ShopListMode = ShopListMode;
  itemsList: ShopItem[] = [];
  isAquiredListSelected: boolean = false;
  currMode: ShopListMode = ShopListMode.Planned;

  ngOnInit() {
    this.shopItemsService.itemsList$.subscribe((res) => {
      this.itemsList = res;
      this.cdr.detectChanges();
    });
  }

  public get itemsTotal() {
    console.warn('calc shop total: ');
    if (this.shopListComponentAquired != undefined) {
      return this.shopListComponentAquired.total;
    }
    return 0;
  }

  // onItemChanged(item: ShopItem) {
  //   console.warn('item changed on shop');
  //   this.cdr.detectChanges();
  //   // this.change.emit(item);
  // }

  getAquired() {
    return this.itemsList.filter((item) => item.status == ShopListMode.Aquired);
  }

  getPlanned() {
    return this.itemsList.filter((item) => item.status == ShopListMode.Planned);
  }

  getDiscarded() {
    return this.itemsList.filter(
      (item) => item.status == ShopListMode.Discarded
    );
  }

  toggleList() {
    this.isAquiredListSelected = !this.isAquiredListSelected;
  }

  changeMode(mode: ShopListMode) {
    this.currMode = mode;
  }
}
