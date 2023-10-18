import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
// import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
// import { provideAuth, getAuth } from '@angular/fire/auth';
// import { provideFirestore, getFirestore } from '@angular/fire/firestore';

// import { MatCardModule } from '@angular/material/card';
// import { MatBadgeModule } from '@angular/material/badge';
// import { MatButtonModule } from '@angular/material/button';
// import { MatIconModule } from '@angular/material/icon';
// import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
// import { MatBottomSheetModule } from '@angular/material/bottom-sheet';

import { HomeComponent } from './components/home/home.component';
import { ShopComponent } from './components/shop/shop.component';
import { NavMainComponent } from './components/nav-main/nav-main.component';
import { ShopListComponent } from './components/shop-list/shop-list.component';
import { ShopItemComponent } from './components/shop-item/shop-item.component';

import { ServiceWorkerModule } from '@angular/service-worker';
import { CoreModule } from './../../../core/src/public-api';
import { CategorizedPipe } from './pipes/categorized.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ShopComponent,
    NavMainComponent,
    ShopListComponent,
    ShopItemComponent,
    CategorizedPipe,
    // CentsToEuroPipe,
    // AquiredPipe,
    // JhpCardComponent,
    // LongPressDirective,
    // LongTouchDirective,
    // JhpToolbarComponent,
    // JhpLanguageSwitcherComponent,
    // JhpBottomSheetComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    MatSidenavModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    // provideAuth(() => getAuth()),
    // provideFirestore(() => getFirestore()),

    CoreModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

// required for AOT compilation
// export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
//   return new TranslateHttpLoader(http, );

// }

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, environment.baseRef + 'assets/i18n/');
}
