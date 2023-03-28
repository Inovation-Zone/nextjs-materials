import { useMemo } from 'react';
import { useQuery } from 'react-query';

import httpRequest from '@/configs/api';
import { SIZES_API } from '@/constants/api';

const getSizes = async () => {
  const result = await httpRequest.get(SIZES_API.getSizes.api);
  return result?.data?.items;
};

const useGetSizes = () => {
  const { data, isLoading, refetch } = useQuery(SIZES_API.getSizes.name, getSizes, { staleTime: 0, cacheTime: 0, });

  const sizes = useMemo(() => {
    return data;
  }, [data]);

  return {
    data: sizes || [],
    isLoading,
    refetch,
  };
};

export default useGetSizes;
