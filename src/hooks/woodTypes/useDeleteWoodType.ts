import { useMutation } from 'react-query';

import httpRequest from '@/configs/api';
import { REQUEST_METHOD, WOOD_TYPES_API } from '@/constants/api';
import { WoodType } from '@/models/products.model';

const useDeleteWoodType = () => {
  const deleteWoodType = async (data: WoodType) => {
    const result = await httpRequest({
      method: REQUEST_METHOD.DELETE,
      data,
      url: WOOD_TYPES_API.createWoodType.api,
    });
    return result;
  };

  return useMutation(deleteWoodType);
};

export default useDeleteWoodType;
