export interface Group {
  id?: string;
  en_name: string;
  vi_name: string;
  catalogs?: Catalog[];
}

export interface Catalog {
  id: string;
  en_name: string;
  vi_name: string;
  fileUrl: string;
  thumbnailUrl: string;
}