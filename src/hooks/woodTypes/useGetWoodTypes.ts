import { useMemo } from 'react';
import { useQuery } from 'react-query';

import httpRequest from '@/configs/api';
import { WOOD_TYPES_API } from '@/constants/api';

const getWoodTypes = async () => {
  const result = await httpRequest.get(WOOD_TYPES_API.getWoodTypes.api);
  return result?.data?.items;
};

const useGetWoodTypes = () => {
  const { data, isLoading, refetch } = useQuery(WOOD_TYPES_API.getWoodTypes.name, getWoodTypes, { staleTime: 0, cacheTime: 0, });

  const woodTypes = useMemo(() => {
    return data;
  }, [data]);

  return {
    data: woodTypes || [],
    isLoading,
    refetch,
  };
};

export default useGetWoodTypes;
