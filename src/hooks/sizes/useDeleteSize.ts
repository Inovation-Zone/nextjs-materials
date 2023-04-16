import { useMutation } from 'react-query';

import httpRequest from '@/configs/api';
import { REQUEST_METHOD, SIZES_API } from '@/constants/api';
import { Size } from '@/models/products.model';

const useDeleteSize = () => {
  const deleteSize = async (data: Size) => {
    const result = await httpRequest({
      method: REQUEST_METHOD.DELETE,
      data,
      url: SIZES_API.createSize.api,
    });
    return result;
  };

  return useMutation(deleteSize);
};

export default useDeleteSize;
