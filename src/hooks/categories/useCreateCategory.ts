import { useMutation } from 'react-query';

import httpRequest from '@/configs/api';
import { CATEGORIES_API, REQUEST_METHOD } from '@/constants/api';
import { Category } from '@/models/categories.model';

const useCreateCategory = () => {
  const category = async (data: Category) => {
    const result = await httpRequest({
      method: REQUEST_METHOD.POST,
      data,
      url: CATEGORIES_API.createCategory.api,
    });
    return result;
  };

  return useMutation(category);
};

export default useCreateCategory;
