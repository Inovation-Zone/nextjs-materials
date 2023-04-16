import { useMutation } from 'react-query';

import httpRequest from '@/configs/api';
import { REQUEST_METHOD, WOOD_TYPES_API } from '@/constants/api';
import { WoodType } from '@/models/products.model';

const useUpdateWoodType = () => {
  const updateWoodType = async (data: WoodType) => {
    const result = await httpRequest({
      method: REQUEST_METHOD.PUT,
      data,
      url: WOOD_TYPES_API.createWoodType.api,
    });
    return result;
  };

  return useMutation(updateWoodType);
};

export default useUpdateWoodType;
