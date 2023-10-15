import { Component, ViewChild, inject } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { TranslateService } from '@ngx-translate/core';
// import { Firestore, collectionData, collection } from '@angular/fire/firestore';
// import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  // firestore: Firestore = inject(Firestore);

  title = 'jhp-shop';
  @ViewChild('drawer') drawer!: MatDrawer;

  constructor(
    translate: TranslateService
    // private firestore: AngularFirestore
  ) {
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('pt');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('pt');
  }

  onToolbarAction(action: string) {
    this.drawer.toggle();
  }

  onNavigated(menu: string) {
    this.drawer.close();
  }
}
