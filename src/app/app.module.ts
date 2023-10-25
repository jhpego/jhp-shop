import { NgModule, isDevMode } from '@angular/core';
import {
  BrowserModule,
  HAMMER_GESTURE_CONFIG,
  HammerGestureConfig,
  HammerModule,
} from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';

import { environment } from '../environments/environment';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import * as hammer from 'hammerjs';
import { MatSidenavModule } from '@angular/material/sidenav';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ShopComponent } from './components/shop/shop.component';
import { NavMainComponent } from './components/nav-main/nav-main.component';
import { ShopListComponent } from './components/shop-list/shop-list.component';
import { ShopItemComponent } from './components/shop-item/shop-item.component';
import { CategorizedPipe } from './pipes/categorized.pipe';
import { BaseModule } from '@lib-base';
import { SwipablePageComponent } from './pipes/swipe-page.directive';
import { EditShopItemComponent } from './components/edit-shop-item/edit-shop-item.component';
import { ShopBottomSheetComponent } from './components/shop-bottom-sheet/shop-bottom-sheet.component';

export const TRANSLATION_CONFIGURATIONS = {
  defaultLanguage: 'en',
  loader: {
    provide: TranslateLoader,
    useFactory: function HttpLoaderFactory(
      http: HttpClient
    ): TranslateHttpLoader {
      return new TranslateHttpLoader(
        http,
        environment.baseRef + 'assets/i18n/'
      );
    },
    deps: [HttpClient],
  },
};

export class MyHammerConfig extends HammerGestureConfig {
  override overrides = <any>{
    swipe: { direction: hammer.DIRECTION_HORIZONTAL },
    pinch: { enable: false },
    rotate: { enable: false },
  };
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ShopComponent,
    NavMainComponent,
    ShopListComponent,
    ShopItemComponent,
    CategorizedPipe,
    SwipablePageComponent,
    EditShopItemComponent,
    ShopBottomSheetComponent,
  ],
  imports: [
    BrowserModule,
    HammerModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: function HttpLoaderFactory(
          http: HttpClient
        ): TranslateHttpLoader {
          return new TranslateHttpLoader(
            http,
            environment.baseRef + 'assets/i18n/'
          );
        },
        deps: [HttpClient],
      },
    }),
    BaseModule.forRoot({
      firebaseConf: environment.firebase,
      basehref: environment.baseRef,
    }),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
    MatSidenavModule,
  ],
  providers: [
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: MyHammerConfig,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
