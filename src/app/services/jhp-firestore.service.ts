import { Injectable, inject } from '@angular/core';
import {
  CollectionReference,
  DocumentReference,
  Firestore,
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  getDocs,
} from '@angular/fire/firestore';
import {
  ShopItem,
  ProductCategoryKind,
  ProductUnitKind,
  FirestoreItem,
} from '../models/models';
import {
  Observable,
  forkJoin,
  from,
  mergeMap,
  of,
  switchMap,
  take,
  tap,
} from 'rxjs';
import { doc } from 'firebase/firestore';

export const mockedList: ShopItem[] = [
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
export class JhpFirestoreService {
  firestore: Firestore = inject(Firestore);
  collectionRef: CollectionReference;

  constructor() {
    this.collectionRef = collection(this.firestore, 'Cenas');
  }

  getAll(): Observable<FirestoreItem[]> {
    return collectionData(this.collectionRef, {
      idField: 'fireId',
    });
  }

  // getAllReferences() {
  //   getDocs({
  //     type: 'query',
  //     converter: CollectionReference,
  //     firestore: CollectionReference
  //   }, )
  // }

  addRecord(newDoc: any) {
    return from(addDoc(this.collectionRef, <any>newDoc));
  }

  deleteAll() {
    return this.getAll().pipe(
      take(1),
      switchMap((items) => {
        const delRequests = items.map((currItem) =>
          from(deleteDoc(doc(this.collectionRef, currItem.fireId)))
        );
        return forkJoin(delRequests);
      })
    );
  }

  bulkAdd(data: any[]) {
    return of(data).pipe(
      switchMap((items) => {
        const addRequests = items.map((currItem) => this.addRecord(currItem));
        return forkJoin(addRequests);
      })
    );
  }

  resetData() {
    return this.deleteAll().pipe(
      switchMap((deleteResult) => this.bulkAdd(mockedList))
    );
  }
}
