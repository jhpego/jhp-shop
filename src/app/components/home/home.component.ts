import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ShopItem } from 'src/app/models/models';
import { JhpFirestoreService } from '../../../../../core/src/public-api';
import { MockedService } from 'src/app/services/mocked.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  items$: Observable<any[]> = this.firestoreService.getAll() as Observable<
    ShopItem[]
  >;

  constructor(
    private firestoreService: JhpFirestoreService,
    private mockedService: MockedService
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

  restoreDatabase() {
    this.mockedService
      .resetData()
      .subscribe((res) => console.warn('after restored'));
  }
}
