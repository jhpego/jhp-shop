import { Injectable } from '@angular/core';
import { switchMap } from 'rxjs';
import {
  ShopItem,
  ProductCategoryKind,
  ProductUnitKind,
  ShopListMode,
} from '../models/models';
// import { JhpFirestoreService } from '@lib-base/services/firestore.service.ts';
import { JhpFirestoreService } from '@lib-base';

import items from './../data/items.json';

// export const mockedList: ShopItem[] = [
//   {
//     identifier: 'chicken',
//     price: 399,
//     quantity: 2,
//     status: ShopListMode.Planned,
//     product: {
//       category: ProductCategoryKind.Meat,
//       identifier: 'chicken',
//       unit: ProductUnitKind.Kilogram,
//     },
//   },
//   {
//     identifier: 'apples',
//     price: 449,
//     quantity: 1,
//     status: ShopListMode.Planned,
//     product: {
//       category: ProductCategoryKind.VegetablesAndFruits,
//       identifier: 'apples',
//       unit: ProductUnitKind.Kilogram,
//     },
//   },
//   {
//     identifier: 'shampoo',
//     price: 449,
//     quantity: 1,
//     status: ShopListMode.Planned,
//     product: {
//       category: ProductCategoryKind.PersonalCare,
//       identifier: 'shampoo',
//       unit: ProductUnitKind.Unit,
//     },
//   },
//   {
//     identifier: 'tuna',
//     price: 80,
//     quantity: 1,
//     status: ShopListMode.Planned,
//     product: {
//       category: ProductCategoryKind.CannedGoods,
//       identifier: 'tuna',
//       unit: ProductUnitKind.Unit,
//     },
//   },
//   {
//     identifier: 'bananas',
//     price: 129,
//     quantity: 1,
//     status: ShopListMode.Planned,
//     product: {
//       category: ProductCategoryKind.VegetablesAndFruits,
//       identifier: 'bananas',
//       unit: ProductUnitKind.Unit,
//     },
//   },
//   {
//     identifier: 'milk',
//     price: 78,
//     quantity: 1,
//     status: ShopListMode.Planned,
//     product: {
//       category: ProductCategoryKind.Dairy,
//       identifier: 'milk',
//       unit: ProductUnitKind.Unit,
//     },
//   },
//   {
//     identifier: 'yogurt',
//     price: 160,
//     quantity: 1,
//     status: ShopListMode.Planned,
//     product: {
//       category: ProductCategoryKind.Dairy,
//       identifier: 'yogurt',
//       unit: ProductUnitKind.Unit,
//     },
//   },
//   {
//     identifier: 'eggs',
//     price: 220,
//     quantity: 1,
//     status: ShopListMode.Planned,
//     product: {
//       category: ProductCategoryKind.Dairy,
//       identifier: 'eggs',
//       unit: ProductUnitKind.Unit,
//     },
//   },
//   {
//     identifier: 'noodles',
//     price: 64,
//     quantity: 1,
//     status: ShopListMode.Aquired,
//     product: {
//       category: ProductCategoryKind.Pantry,
//       identifier: 'noodles',
//       unit: ProductUnitKind.Unit,
//     },
//   },
//   {
//     identifier: 'spaghetti',
//     price: 100,
//     quantity: 1,
//     status: ShopListMode.Discarded,
//     product: {
//       category: ProductCategoryKind.Pantry,
//       identifier: 'spaghetti',
//       unit: ProductUnitKind.Unit,
//     },
//   },
//   {
//     identifier: 'gobbetti',
//     price: 90,
//     quantity: 1,
//     status: ShopListMode.Planned,
//     product: {
//       category: ProductCategoryKind.Pantry,
//       identifier: 'gobbetti',
//       unit: ProductUnitKind.Unit,
//     },
//   },
//   {
//     identifier: 'bread',
//     price: 90,
//     quantity: 1,
//     status: ShopListMode.Planned,
//     product: {
//       category: ProductCategoryKind.Bakery,
//       identifier: 'bread',
//       unit: ProductUnitKind.Unit,
//     },
//   },
//   {
//     identifier: 'steak',
//     price: 399,
//     quantity: 1,
//     status: ShopListMode.Planned,
//     product: {
//       category: ProductCategoryKind.Meat,
//       identifier: 'steak',
//       unit: ProductUnitKind.Unit,
//     },
//   },
//   {
//     identifier: 'breaded fish',
//     price: 499,
//     quantity: 1,
//     status: ShopListMode.Aquired,
//     product: {
//       category: ProductCategoryKind.Frozen,
//       identifier: 'breaded fish',
//       unit: ProductUnitKind.Unit,
//     },
//   },
// ];

@Injectable({
  providedIn: 'root',
})
export class MockedService {
  constructor(private firestoreService: JhpFirestoreService) {}

  resetData() {
    const mockedList = items.data as any[];

    return this.firestoreService
      .deleteAll()
      .pipe(
        switchMap((deleteResult) => this.firestoreService.addBulk(mockedList))
      );
  }

  addMocked() {
    const mockedList = items.data as any[];
    return this.firestoreService.addBulk(mockedList);
  }
}
