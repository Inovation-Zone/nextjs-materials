export interface CollectionGroup {
  id: string;
  en_name: string;
  vi_name: string;
  collections?: Collection[];
}

export interface Collection {
  id: string;
  name: string;
  color: string;
  code: string;
  size: string;
  surface: string;
  fileUrls: string[];
  collectionGroup?: CollectionGroup;
}