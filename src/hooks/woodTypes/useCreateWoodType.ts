import { useMutation } from 'react-query';

import httpRequest from '@/configs/api';
import { REQUEST_METHOD, WOOD_TYPES_API } from '@/constants/api';
import { WoodType } from '@/models/products.model';

const useCreateWoodType = () => {
  const createWoodType = async (data: WoodType) => {
    const result = await httpRequest({
      method: REQUEST_METHOD.POST,
      data,
      url: WOOD_TYPES_API.createWoodType.api,
    });
    return result;
  };

  return useMutation(createWoodType);
};

export default useCreateWoodType;
