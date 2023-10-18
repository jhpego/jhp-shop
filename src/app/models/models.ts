import { FirestoreItem } from '../../../../core/src/public-api';

export interface MenuEntry {
  identifier: string;
  path: string;
  icon?: string;
}

export interface ShopItem extends FirestoreItem {
  identifier: string;
  price: number;
  quantity: number;
  product: ShopProduct;
  aquired: boolean;
}

export interface ShopProduct {
  identifier: string;
  unit: ProductUnitKind;
  category: ProductCategoryKind;
  preview?: string;
}

export enum ProductUnitKind {
  Unit,
  Kilogram,
  Liter,
  Dose,
}

export enum ProductCategoryKind {
  HigyeneHealthAndCosmetics,
  Meat,
  Fish,
  VegetablesAndFruits,
  Conservants,
  Candys,
  Dairy,
  Pasta,
  Bakery,
  Frozen,
}

export interface ItemsGroup {
  category: ProductCategoryKind;
  items: ShopItem[];
}

export enum ShopListMode {
  Unset,
  Planned,
  Aquired,
}
