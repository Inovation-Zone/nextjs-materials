import { useMemo } from 'react';
import { useQuery } from 'react-query';

import httpRequest from '@/configs/api';
import { ADHESIVES_API } from '@/constants/api';

const getAdhesives = async () => {
  const result = await httpRequest.get(ADHESIVES_API.getAdhesives.api);
  return result?.data?.items;
};

const useGetAdhesives = () => {
  const { data, isLoading, refetch } = useQuery(ADHESIVES_API.getAdhesives.name, getAdhesives, { staleTime: 0, cacheTime: 0, });

  const adhesives = useMemo(() => {
    return data;
  }, [data]);

  return {
    data: adhesives || [],
    isLoading,
    refetch,
  };
};

export default useGetAdhesives;
