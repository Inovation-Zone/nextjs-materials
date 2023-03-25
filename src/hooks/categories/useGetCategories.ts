import { useMemo } from 'react';
import { useQuery } from 'react-query';

import httpRequest from '@/configs/api';
import { CATEGORIES_API } from '@/constants/api';
import { Category } from '@/models/categories.model';
import { BaseResponse } from '@/models/response.model';

const getCategories = async (): Promise<BaseResponse<Category[]>> => {
  const result = await httpRequest.get(CATEGORIES_API.getCategories.api);
  return result?.data?.items;
};

const useGetCategories = () => {
  const { data, isLoading, refetch } = useQuery(CATEGORIES_API.getCategories.name, getCategories, { staleTime: 0, cacheTime: 0, });

  const categories = useMemo(() => {
    return data;
  }, [data]);

  return {
    data: categories || [],
    isLoading,
    refetch,
  };
};

export default useGetCategories;
