import { useMemo } from 'react';
import { useQuery } from 'react-query';

import httpRequest from '@/configs/api';
import { COLLECTIONS_API } from '@/constants/api';

const getCollectionGroups = async () => {
  const result = await httpRequest.get(COLLECTIONS_API.getCollectionGroups.api);
  return result?.data?.items;
};

const useGetCollectionGroups = () => {
  const { data, isLoading, refetch } = useQuery(COLLECTIONS_API.getCollectionGroups.name, getCollectionGroups, { staleTime: 0, cacheTime: 0, });

  const collectionGroups = useMemo(() => {
    return data;
  }, [data]);

  return {
    data: collectionGroups || [],
    isLoading,
    refetch,
  };
};

export default useGetCollectionGroups;
