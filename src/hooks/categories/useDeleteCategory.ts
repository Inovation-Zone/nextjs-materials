import { useMutation } from 'react-query';

import httpRequest from '@/configs/api';
import { CATEGORIES_API, REQUEST_METHOD } from '@/constants/api';

const useDeleteCategory = () => {
  const category = async (data: { id: string }) => {
    const result = await httpRequest({
      method: REQUEST_METHOD.DELETE,
      data,
      url: CATEGORIES_API.createCategory.api,
    });
    return result;
  };

  return useMutation(category);
};

export default useDeleteCategory;
