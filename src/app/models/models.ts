import { FirestoreItem } from '@lib-base';

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
  productId: number;
  status: ShopListMode;
  // aquired: boolean;
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
  Bakery,
  Beverages,
  VegetablesAndFruits,
  Meat,
  Seafood,
  Dairy,
  Deli,
  Frozen,
  Pantry,
  Snacks,
  Candy,
  PersonalCare,
  Household,
  PetSupplies,
  CannedGoods,
}

export interface ItemsGroup {
  category: ProductCategoryKind;
  items: ShopItem[];
}

export enum ShopListMode {
  Unset,
  Planned,
  Aquired,
  Discarded,
}
