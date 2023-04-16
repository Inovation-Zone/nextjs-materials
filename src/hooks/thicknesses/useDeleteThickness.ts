import { useMutation } from 'react-query';

import httpRequest from '@/configs/api';
import { REQUEST_METHOD, THICKNESSES_API } from '@/constants/api';
import { Thickness } from '@/models/products.model';

const useDeleteThickness = () => {
  const deleteThickness = async (data: Thickness) => {
    const result = await httpRequest({
      method: REQUEST_METHOD.DELETE,
      data,
      url: THICKNESSES_API.createThickness.api,
    });
    return result;
  };

  return useMutation(deleteThickness);
};

export default useDeleteThickness;
