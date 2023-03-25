import { useMemo } from 'react';
import { useQuery } from 'react-query';

import httpRequest from '@/configs/api';
import { CATEGORIES_API } from '@/constants/api';
import { Category } from '@/models/categories.model';
import { BaseResponse } from '@/models/response.model';

const getCategoryDetails = async (categoryId: string): Promise<BaseResponse<Category>> => {
  const response = await httpRequest.get(CATEGORIES_API.getCategoryDetails.api(categoryId));
  return response.data;
};

export const useGetCategoryDetails = (params: { categoryId: string }) => {
  const { data, isLoading, refetch, ...rest } = useQuery(
    CATEGORIES_API.getCategoryDetails.name(params?.categoryId),
    () => getCategoryDetails(params?.categoryId),
  );

  const categoryDetails = useMemo(() => {
    return data?.data;
  }, [data]);

  return {
    data: categoryDetails,
    isLoading,
    refetch,
    ...rest,
  };
};

export default useGetCategoryDetails;
