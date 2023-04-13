import { Adhesive, Product, Size, Thickness, WoodType } from "@/models/products.model";

export interface CustomerOrderBody {
  id?: string;
  code?: string;
  fullName?: string;
  email?: string;
  phoneNumber?: string;
  contactAddress?: string;
  note?: string;
  carts?: {
    productId?: string,
    woodTypeId?: string,
    adhesiveId?: string,
    thicknessId?: string,
    sizeId?: string,
    quantity?: number,
  }[];
  status?: string;
}

export interface CustomerOrder {
  id?: string;
  code: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  contactAddress: string;
  note: string;
  orderProducts: OrderProduct[];
  status?: string;
  createdAt?: string;
}

export interface OrderProduct {
  product: Product;
  woodType: WoodType;
  adhesive: Adhesive;
  thickness: Thickness;
  size: Size;
  quantity: number;
}

export interface TagColor {
  new: string;
  process: string;
  done: string;
  closed: string;
}
