import { useMutation } from 'react-query';

import httpRequest from '@/configs/api';
import { ADHESIVES_API, REQUEST_METHOD } from '@/constants/api';
import { Adhesive } from '@/models/products.model';

const useCreateAdhesive = () => {
  const createAdhesive = async (data: Adhesive) => {
    const result = await httpRequest({
      method: REQUEST_METHOD.POST,
      data,
      url: ADHESIVES_API.createAdhesive.api,
    });
    return result;
  };

  return useMutation(createAdhesive);
};

export default useCreateAdhesive;
