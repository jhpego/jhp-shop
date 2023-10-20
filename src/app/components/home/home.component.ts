import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ShopItem } from '../../models/models';
import { MockedService } from '../../services/mocked.service';
import { JhpFirestoreService } from '@lib-base';
import { ShopItemsService } from '../../services/shop-items.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  items$: Observable<any[]> = this.shopItemsService.getItemsCombined();

  constructor(
    private firestoreService: JhpFirestoreService,
    private mockedService: MockedService,
    private shopItemsService: ShopItemsService
  ) {}

  onActionTest() {
    const newDoc = {
      value: 'dssa',
    };
    this.firestoreService
      .addRecord(newDoc)
      .subscribe((res) => console.warn('record added: ', res));

    // this.firestoreService
    //   .deleteAll()
    //   .subscribe((res) => console.warn('all fetched', res));

    // this.firestoreService.importData();
  }

  addBulk() {
    this.mockedService
      .addMocked()
      .subscribe((res) => console.warn('after bulk add'));
  }

  restoreDatabase() {
    this.mockedService
      .resetData()
      .subscribe((res) => console.warn('after restored'));
  }
}
