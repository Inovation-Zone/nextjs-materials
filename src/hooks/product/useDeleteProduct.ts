import { useMutation } from 'react-query';

import httpRequest from '@/configs/api';
import { PRODUCT_API, REQUEST_METHOD } from '@/constants/api';
import { ProductBody } from '@/models/products.model';

const useDeleteProduct = () => {
  const deleteProduct = async (data: ProductBody) => {
    const result = await httpRequest({
      method: REQUEST_METHOD.DELETE,
      data,
      url: PRODUCT_API.createProduct.api,
    });
    return result;
  };

  return useMutation(deleteProduct);
};

export default useDeleteProduct;
