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
import { ShopItem } from '../../models/models';
import { CardMode } from '@lib-base';

@Component({
  selector: 'app-shop-item',
  templateUrl: './shop-item.component.html',
  styleUrls: ['./shop-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopItemComponent {
  @Input()
  item!: ShopItem;
  // @Output() change: EventEmitter<ShopItem> = new EventEmitter();

  constructor(
    private cdr: ChangeDetectorRef,
    readonly bottomSheet: MatBottomSheet
  ) {}

  CardModeEnum = CardMode;

  itemClicked(event: any) {
    this.item.aquired = !this.item.aquired;
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
    return this.bottomSheet.open(this.template, {
      panelClass: 'full-width',
    });
  }
}
