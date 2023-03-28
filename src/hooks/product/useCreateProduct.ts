import { useMutation } from 'react-query';

import httpRequest from '@/configs/api';
import { PRODUCT_API, REQUEST_METHOD } from '@/constants/api';
import { ProductBody } from '@/models/products.model';

const useCreateProduct = () => {
  const createProduct = async (data: ProductBody) => {
    const result = await httpRequest({
      method: REQUEST_METHOD.POST,
      data,
      url: PRODUCT_API.createProduct.api,
    });
    return result;
  };

  return useMutation(createProduct);
};

export default useCreateProduct;
