import { useMemo } from 'react';
import { useQuery } from 'react-query';

import httpRequest from '@/configs/api';
import { CATEGORIES_API } from '@/constants/api';

const getCategories = async () => {
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
