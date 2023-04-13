import { useMemo } from 'react';
import { useQuery } from 'react-query';

import httpRequest from '@/configs/api';
import { COLLECTIONS_API } from '@/constants/api';
import { Params } from '@/models/response.model';

const getCollections = async (params: Params | undefined) => {
  const result = await httpRequest.get(COLLECTIONS_API.getCollectionsGroupByCollectionGroupId.api, {
    params
  });
  return result?.data?.items;
};

const useGetCollectionsGroupByCollectionGroup = (params: Params | undefined) => {
  const { data, isLoading, refetch } = useQuery(COLLECTIONS_API.getCollectionsGroupByCollectionGroupId.name, () => getCollections(params), { staleTime: 0, cacheTime: 0, });

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
