import { Category } from "@/models/categories.model";

export interface ProductBody {
  id?: string
  name?: string;
  description?: string;
  categoryId?: string;
  imageUrls?: string[];
  woodTypeIds?: string[];
  adhesiveIds?: string[];
  thicknessIds?: string[];
  sizeIds?: string[];
}

export interface FileResource {
  id: string;
  targetId: string;
  fileUrl: string;
}

export interface WoodType {
  id: string;
  vi_name: string;
  en_name: string;
  value?: string;
}

export interface Adhesive {
  id: string;
  name: string;
  value?: string;
}

export interface Thickness {
  id: string;
  name?: string;
  value: number;
}

export interface Size {
  id: string;
  name?: string;
  width: number;
  height: number;
  value?: string;
}

export interface Product {
  id?: string
  vi_name: string;
  en_name: string;
  vi_description: string;
  en_description: string;
  category?: Category;
  woodTypes?: WoodType[];
  adhesives?: Adhesive[];
  thicknesses?: Thickness[];
  sizes?: Size[];
  fileResources?: FileResource[];
  isHidden?: boolean;
  isOutOfStock?: boolean;
}

export interface Option {
  value: string;
  name: string;
}

export interface WoodTypeOption {
  value: string;
  vi_name: string;
  en_name: string;
}