import { useMutation } from 'react-query';

import httpRequest from '@/configs/api';
import { PRODUCT_API, REQUEST_METHOD } from '@/constants/api';
import { ProductBody } from '@/models/products.model';

const useUpdateProduct = () => {
  const updateProduct = async (data: ProductBody) => {
    const result = await httpRequest({
      method: REQUEST_METHOD.PUT,
      data,
      url: PRODUCT_API.createProduct.api,
    });
    return result;
  };

  return useMutation(updateProduct);
};

export default useUpdateProduct;
