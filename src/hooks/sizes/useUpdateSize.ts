import { useMutation } from 'react-query';

import httpRequest from '@/configs/api';
import { REQUEST_METHOD, SIZES_API } from '@/constants/api';
import { Size } from '@/models/products.model';

const useUpdateSize = () => {
  const useUpdateSize = async (data: Size) => {
    const result = await httpRequest({
      method: REQUEST_METHOD.PUT,
      data,
      url: SIZES_API.createSize.api,
    });
    return result;
  };

  return useMutation(useUpdateSize);
};

export default useUpdateSize;
