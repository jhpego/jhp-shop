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
  tap,
  toArray,
} from 'rxjs';

const mockedList: ShopItem[] = [
  {
    identifier: 'chicken',
    price: 399,
    quantity: 2,
    aquired: false,
    product: {
      category: ProductCategoryKind.Meat,
      identifier: 'chicken',
      unit: ProductUnitKind.Kilogram,
    },
  },
  {
    identifier: 'apples',
    price: 449,
    quantity: 1,
    aquired: false,
    product: {
      category: ProductCategoryKind.VegetablesAndFruits,
      identifier: 'apples',
      unit: ProductUnitKind.Kilogram,
    },
  },
  {
    identifier: 'shampoo',
    price: 449,
    quantity: 1,
    aquired: true,
    product: {
      category: ProductCategoryKind.HigyeneHealthAndCosmetics,
      identifier: 'shampoo',
      unit: ProductUnitKind.Unit,
    },
  },
  {
    identifier: 'tuna',
    price: 80,
    quantity: 1,
    aquired: false,
    product: {
      category: ProductCategoryKind.Conservants,
      identifier: 'tuna',
      unit: ProductUnitKind.Unit,
    },
  },
  {
    identifier: 'bananas',
    price: 129,
    quantity: 1,
    aquired: false,
    product: {
      category: ProductCategoryKind.VegetablesAndFruits,
      identifier: 'bananas',
      unit: ProductUnitKind.Unit,
    },
  },
  {
    identifier: 'milk',
    price: 78,
    quantity: 1,
    aquired: false,
    product: {
      category: ProductCategoryKind.Dairy,
      identifier: 'milk',
      unit: ProductUnitKind.Unit,
    },
  },
  {
    identifier: 'yogurt',
    price: 160,
    quantity: 1,
    aquired: false,
    product: {
      category: ProductCategoryKind.Dairy,
      identifier: 'yogurt',
      unit: ProductUnitKind.Unit,
    },
  },
  {
    identifier: 'eggs',
    price: 220,
    quantity: 1,
    aquired: false,
    product: {
      category: ProductCategoryKind.Dairy,
      identifier: 'eggs',
      unit: ProductUnitKind.Unit,
    },
  },
  {
    identifier: 'noodles',
    price: 64,
    quantity: 1,
    aquired: true,
    product: {
      category: ProductCategoryKind.Pasta,
      identifier: 'noodles',
      unit: ProductUnitKind.Unit,
    },
  },
  {
    identifier: 'spaghetti',
    price: 100,
    quantity: 1,
    aquired: false,
    product: {
      category: ProductCategoryKind.Pasta,
      identifier: 'spaghetti',
      unit: ProductUnitKind.Unit,
    },
  },
  {
    identifier: 'gobbetti',
    price: 90,
    quantity: 1,
    aquired: false,
    product: {
      category: ProductCategoryKind.Pasta,
      identifier: 'gobbetti',
      unit: ProductUnitKind.Unit,
    },
  },
  {
    identifier: 'bread',
    price: 90,
    quantity: 1,
    aquired: false,
    product: {
      category: ProductCategoryKind.Bakery,
      identifier: 'bread',
      unit: ProductUnitKind.Unit,
    },
  },
  {
    identifier: 'steak',
    price: 399,
    quantity: 1,
    aquired: false,
    product: {
      category: ProductCategoryKind.Meat,
      identifier: 'steak',
      unit: ProductUnitKind.Unit,
    },
  },
  {
    identifier: 'breaded fish',
    price: 499,
    quantity: 1,
    aquired: true,
    product: {
      category: ProductCategoryKind.Frozen,
      identifier: 'breaded fish',
      unit: ProductUnitKind.Unit,
    },
  },
];

@Injectable({
  providedIn: 'root',
})
export class ShopItemsService {
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

  itemsList$ = of(mockedList).pipe(
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

  constructor(private http: HttpClient) {
    this.setList();
    // this.initItems();
  }
}
