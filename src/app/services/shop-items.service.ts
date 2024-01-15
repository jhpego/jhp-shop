import { Injectable } from '@angular/core';
import {
  ProductCategoryKind,
  ProductUnitKind,
  ShopItem,
} from '../models/models';
import { HttpClient } from '@angular/common/http';
import {
  Observable,
  Subject,
  filter,
  from,
  lastValueFrom,
  map,
  mergeMap,
  of,
  take,
  tap,
  toArray,
} from 'rxjs';
import { JhpFirestoreService } from '@lib-base';
import products from './../data/products.json';
import {
  MatBottomSheet,
  MatBottomSheetConfig,
} from '@angular/material/bottom-sheet';
import { ShopBottomSheetComponent } from '../components/shop-bottom-sheet/shop-bottom-sheet.component';
import { UtilitiesService } from 'libs/base/src/services/utilities.service';

@Injectable({
  providedIn: 'root',
})
export class ShopItemsService {
  constructor(
    private http: HttpClient,
    private jhpFirestoreService: JhpFirestoreService,
    readonly bottomSheet: MatBottomSheet,
    private utilitiesService: UtilitiesService
  ) {
    this.setList();
  }

  shopItemUpdated$: Subject<ShopItem | null> = new Subject<ShopItem | null>();

  getImageFromIdentifier(identifier: string): Observable<string> {
    const url = `https://pixabay.com/api/?key=39989250-bc0fc5f5c826b727960dabdf2&q=${identifier}}&image_type=vector`;
    return this.http.get<any>(url).pipe(
      map((res) => {
        try {
          const hitResults: any[] = res.hits;
          if (hitResults.length == 0) {
            throw 'no pixabay results for query';
          }
          let selectedHitResult = hitResults[0];
          const bestTaggedResults: any[] = hitResults.filter((currHit: any) => {
            const tags: string[] = currHit.tags.split(', ');
            return tags.includes(identifier);
          });
          selectedHitResult =
            bestTaggedResults.length > 0
              ? bestTaggedResults[0]
              : selectedHitResult;
          return selectedHitResult.previewURL;
        } catch (error) {}
        return '';
      })
    );
  }

  itemsList: ShopItem[] = []; // = mockedList;

  // itemsList$ = (
  //   this.jhpFirestoreService.getAll() as Observable<ShopItem[]>
  // ).pipe(
  //   take(1),
  //   tap((res) => console.warn('results fetched', res)),
  //   mergeMap((list) => {
  //     const requests = list.map((item) =>
  //       this.getImageFromIdentifier(item.product.identifier).pipe(
  //         mergeMap((propertyData) => {
  //           item.product.preview = propertyData;
  //           return of(item);
  //         })
  //       )
  //     );
  //     return from(requests).pipe(
  //       mergeMap((item) => item),
  //       toArray()
  //     );
  //   })
  // );
  itemsList$ = this.getItemsCombined();

  getProducts() {
    const mockedProducts = products.data.map((product) => ({
      ...product,
      preview: '',
      category: product.category as ProductCategoryKind,
    }));
    return of(mockedProducts).pipe(
      mergeMap((list) => {
        const requests = list.map((product) =>
          this.getImageFromIdentifier(product.identifier).pipe(
            mergeMap((propertyData) => {
              product.preview = propertyData;
              return of(product);
            })
          )
        );
        return from(requests).pipe(
          mergeMap((item) => item),
          toArray()
        );
      })
    );
  }

  getItems() {
    return this.jhpFirestoreService.getAll() as Observable<ShopItem[]>;
  }

  getItemsCombined(): Observable<any[]> {
    const items$ = this.getItems();
    const productsData$ = this.getProducts();
    return items$.pipe(
      mergeMap((items) =>
        productsData$.pipe(
          map((products) =>
            items.map((item) => {
              const product = products.find(
                (product) => product.id === item.productId
              );
              return { ...item, product };
            })
          )
        )
      )
    );
  }

  setList() {
    this.itemsList$.subscribe((res) => {
      this.itemsList = res;
    });
  }

  getList() {
    return this.itemsList;
  }

  openShopItemSheet(
    item?: ShopItem | null,
    cb?: (item?: ShopItem | null) => void | null,
    config?: MatBottomSheetConfig
  ) {
    const bottomSheetRef = this.bottomSheet.open(ShopBottomSheetComponent, {
      panelClass: 'full-width',
      data: {
        item: item,
        isNew: item == null,
      },
    });

    bottomSheetRef.afterDismissed().subscribe((bottomSheetResult) => {
      console.log('after bottomsheet dismissed', bottomSheetResult);
      if (bottomSheetResult == null) {
        console.log('item removed');
      } else if (item == null) {
        console.log('item added');
      } else {
        console.log('item edited');
        this.utilitiesService.cloneObjectValues(item, bottomSheetResult, true);
      }

      if (cb != null) {
        cb(item);
      }
    });
  }
}
