import { useMemo } from 'react';
import { useQuery } from 'react-query';

import httpRequest from '@/configs/api';
import { CATALOGS_API } from '@/constants/api';

const getCatalogGroups = async () => {
  const result = await httpRequest.get(CATALOGS_API.getCatalogGroups.api);
  return result?.data?.items;
};

const useGetCatalogGroups = () => {
  const { data, isLoading, refetch } = useQuery(CATALOGS_API.getCatalogGroups.name, getCatalogGroups, { staleTime: 0, cacheTime: 0, });

  const catalogGroups = useMemo(() => {
    return data;
  }, [data]);

  return {
    data: catalogGroups || [],
    isLoading,
    refetch,
  };
};

export default useGetCatalogGroups;
