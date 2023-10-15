import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ShopItem } from 'src/app/models/models';
import { JhpFirestoreService } from 'src/app/services/jhp-firestore.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  items$: Observable<any[]> = this.firestoreService.getAll() as Observable<
    ShopItem[]
  >;

  constructor(private firestoreService: JhpFirestoreService) {}

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
    this.firestoreService
      .resetData()
      .subscribe((res) => console.warn('after restored'));
  }
}
