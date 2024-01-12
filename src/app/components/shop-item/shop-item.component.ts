import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import {
  MatBottomSheet,
  MatBottomSheetConfig,
} from '@angular/material/bottom-sheet';
import { ShopItem, ShopListMode } from '../../models/models';
import { CardMode } from '@lib-base';
import { ShopBottomSheetComponent } from '../shop-bottom-sheet/shop-bottom-sheet.component';
import { ShopItemsService } from '../../services/shop-items.service';
import { UtilitiesService } from 'libs/base/src/services/utilities.service';

@Component({
  selector: 'app-shop-item',
  templateUrl: './shop-item.component.html',
  styleUrls: ['./shop-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopItemComponent {
  @Input()
  item!: ShopItem;
  ShopListMode = ShopListMode;
  @Output() itemChange: EventEmitter<ShopItem> = new EventEmitter<ShopItem>();

  constructor(
    private cdr: ChangeDetectorRef,
    readonly bottomSheet: MatBottomSheet,
    private shopItemsService: ShopItemsService,
    private utilitiesService: UtilitiesService
  ) {}

  ngOnInit() {
    // this.shopItemsService.shopItemUpdated$.subscribe((shopItem: ShopItem) => {
    //   debugger;
    //   this.item = shopItem;
    //   this.cdr.detectChanges();
    // });
  }

  CardModeEnum = CardMode;

  itemClicked(event: any) {
    this.item.status =
      this.item.status === ShopListMode.Planned
        ? ShopListMode.Aquired
        : ShopListMode.Planned;
    // this.change.emit(this.item);
  }

  add() {
    this.item.quantity++;
    // this.change.emit(this.item);
  }

  remove() {
    this.item.quantity--;
    // this.change.emit(this.item);
  }

  @ViewChild(TemplateRef) template!: TemplateRef<any>;

  open(config?: MatBottomSheetConfig) {
    const bottomSheetRef = this.bottomSheet.open(ShopBottomSheetComponent, {
      panelClass: 'full-width',
      data: {
        item: this.item,
        cenas: '2',
      },
    });

    bottomSheetRef.afterDismissed().subscribe((dataFromChild) => {
      console.log('after dismissed', dataFromChild);

      this.utilitiesService.cloneObjectValues(this.item, dataFromChild);
      // this.item = dataFromChild;
      // this.item.title = dataFromChild.title;
      // Object.assign(dataFromChild, this.item);
      this.itemChange.emit(this.item);
      this.cdr.markForCheck();
      // this.cdr.markForCheck();
    });
  }
}
