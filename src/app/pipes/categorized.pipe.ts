import { Pipe, PipeTransform } from '@angular/core';
import { ItemsGroup, ProductCategoryKind, ShopItem } from '../models/models';

export type Intermediate = {
  [key: string]: ShopItem[];
};

@Pipe({
  name: 'categorized',
})
export class CategorizedPipe implements PipeTransform {
  transform(items: ShopItem[]) {
    const itemsMap: Intermediate = items.reduce((prv, curr, idx) => {
      prv[curr.product.category] = prv[curr.product.category] ?? [];
      prv[curr.product.category].push(curr);
      return prv;
    }, {} as Intermediate);
    const grouped: ItemsGroup[] = Object.entries(itemsMap).map(
      ([key, values]) => {
        return {
          category: +key as ProductCategoryKind,
          items: values,
        };
      }
    );
    return grouped;
  }
}

// @Pipe({
//   name: 'cents2eur',
// })
// export class CentsToEuroPipe implements PipeTransform {
//   transform(cents: number) {
//     return cents / 100;
//   }
// }

@Pipe({
  name: 'aquired',
})
export class AquiredPipe implements PipeTransform {
  transform(items: ShopItem[], aquired: boolean = true) {
    return items.filter((item) => item.aquired == aquired);
  }
}
