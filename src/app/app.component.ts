import { Component, ViewChild, inject } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { ToolbarMenuPosition } from '@lib-base';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../environments/environment';
import { AppService } from './services/app.service';
// import { Firestore, collectionData, collection } from '@angular/fire/firestore';
// import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  // firestore: Firestore = inject(Firestore);

  title = 'ShopApp';
  @ViewChild('drawer') drawer!: MatDrawer;
  MenuPositionEnum = ToolbarMenuPosition;

  constructor(
    translate: TranslateService,
    // private firestore: AngularFirestore
    private appService: AppService
  ) {
    console.warn('is production mode? ', environment.production); // Logs false for development environment

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

  onLongClick() {
    alert('long');
  }

  swipeLeft() {
    console.warn('left');
    this.appService.swipeLeft();
  }

  swipeRight() {
    console.warn('right');
    this.appService.swipeRight();
  }
}
