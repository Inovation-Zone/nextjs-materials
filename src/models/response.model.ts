export interface BaseResponse<T = void> {
  httpHeaders: object;
  httpStatusCode: number;
  message: string;
  data: T;
  otherParams: object;
  map: any;
}

export interface Params {
  searchKeys?: string;
  categoryIds?: string;
  isHidden?: boolean;
}