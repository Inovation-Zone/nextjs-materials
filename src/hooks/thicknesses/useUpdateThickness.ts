import { useMutation } from 'react-query';

import httpRequest from '@/configs/api';
import { REQUEST_METHOD, THICKNESSES_API } from '@/constants/api';
import { Thickness } from '@/models/products.model';

const useUpdateThickness = () => {
  const updateThickness = async (data: Thickness) => {
    const result = await httpRequest({
      method: REQUEST_METHOD.PUT,
      data,
      url: THICKNESSES_API.createThickness.api,
    });
    return result;
  };

  return useMutation(updateThickness);
};

export default useUpdateThickness;
