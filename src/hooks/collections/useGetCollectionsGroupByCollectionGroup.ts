import { useMemo } from 'react';
import { useQuery } from 'react-query';

import httpRequest from '@/configs/api';
import { COLLECTIONS_API } from '@/constants/api';

const getCollections = async () => {
  const result = await httpRequest.get(COLLECTIONS_API.getCollectionsGroupByCollectionGroupId.api);
  return result?.data?.items;
};

const useGetCollectionsGroupByCollectionGroup = () => {
  const { data, isLoading, refetch } = useQuery(COLLECTIONS_API.getCollectionsGroupByCollectionGroupId.name, getCollections, { staleTime: 0, cacheTime: 0, });

  const collectionsGroupByCollectionGroupId = useMemo(() => {
    return data;
  }, [data]);

  return {
    data: collectionsGroupByCollectionGroupId || [],
    isLoading,
    refetch,
  };
};

export default useGetCollectionsGroupByCollectionGroup;
