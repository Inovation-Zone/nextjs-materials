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
  name: string;
}

export interface Adhesive {
  id: string;
  name: string;
}

export interface Thickness {
  id: string;
  value: number;
}

export interface Size {
  id: string;
  width: number;
  height: number;
}

export interface Product {
  id?: string
  name: string;
  description: string;
  category: Category;
  woodTypes?: WoodType[];
  adhesives?: Adhesive[];
  thicknesses?: Thickness[];
  sizes?: Size[];
  fileResources?: FileResource[];
}

export interface Option {
  value: string;
  name: string;
}