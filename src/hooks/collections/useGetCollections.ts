import { useMemo } from 'react';
import { useQuery } from 'react-query';

import httpRequest from '@/configs/api';
import { COLLECTIONS_API } from '@/constants/api';

const getCollections = async () => {
  const result = await httpRequest.get(COLLECTIONS_API.getCollections.api);
  return result?.data?.items;
};

const useGetCollections = () => {
  const { data, isLoading, refetch } = useQuery(COLLECTIONS_API.getCollections.name, getCollections, { staleTime: 0, cacheTime: 0, });

  const collections = useMemo(() => {
    return data;
  }, [data]);

  return {
    data: collections || [],
    isLoading,
    refetch,
  };
};

export default useGetCollections;
