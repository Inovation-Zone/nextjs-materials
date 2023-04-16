import { useMutation } from 'react-query';

import httpRequest from '@/configs/api';
import { ADHESIVES_API, REQUEST_METHOD } from '@/constants/api';
import { Adhesive } from '@/models/products.model';

const useDeleteAdhesive = () => {
  const deleteAdhesive = async (data: Adhesive) => {
    const result = await httpRequest({
      method: REQUEST_METHOD.DELETE,
      data,
      url: ADHESIVES_API.createAdhesive.api,
    });
    return result;
  };

  return useMutation(deleteAdhesive);
};

export default useDeleteAdhesive;
