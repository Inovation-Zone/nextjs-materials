import { useMutation } from 'react-query';

import httpRequest from '@/configs/api';
import { REQUEST_METHOD, THICKNESSES_API } from '@/constants/api';
import { Thickness } from '@/models/products.model';

const useCreateThickness = () => {
  const createThickness = async (data: Thickness) => {
    const result = await httpRequest({
      method: REQUEST_METHOD.POST,
      data,
      url: THICKNESSES_API.createThickness.api,
    });
    return result;
  };

  return useMutation(createThickness);
};

export default useCreateThickness;
