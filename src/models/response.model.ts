export interface BaseResponse<T = void> {
  httpHeaders: object;
  httpStatusCode: number;
  message: string;
  data: T;
  otherParams: object;
}