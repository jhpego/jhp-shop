import { Injectable } from '@angular/core';
import {
  ProductCategoryKind,
  ProductUnitKind,
  ShopItem,
} from '../models/models';
import { HttpClient } from '@angular/common/http';
import {
  Observable,
  from,
  lastValueFrom,
  map,
  mergeMap,
  of,
  take,
  tap,
  toArray,
} from 'rxjs';
import { JhpFirestoreService, mockedList } from './jhp-firestore.service';

@Injectable({
  providedIn: 'root',
})
export class ShopItemsService {
  constructor(
    private http: HttpClient,
    private jhpFirestoreService: JhpFirestoreService
  ) {
    this.setList();
  }

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

  itemsList$ = (
    this.jhpFirestoreService.getAll() as Observable<ShopItem[]>
  ).pipe(
    tap((res) => console.warn('results fetched', res)),
    mergeMap((list) => {
      const requests = list.map((item) =>
        this.getImageFromIdentifier(item.product.identifier).pipe(
          mergeMap((propertyData) => {
            item.product.preview = propertyData;
            return of(item);
          })
        )
      );
      return from(requests).pipe(
        mergeMap((item) => item),
        toArray()
      );
    })
  );

  setList() {
    this.itemsList$.subscribe((res) => {
      this.itemsList = res;
    });
  }

  getList() {
    return this.itemsList;
  }

  getAquired() {
    return this.itemsList.filter((item) => item.aquired);
  }

  getNotAquired() {
    return this.itemsList.filter((item) => !item.aquired);
  }
}
