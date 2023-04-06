import { useMemo } from 'react';
import { useQuery } from 'react-query';

import httpRequest from '@/configs/api';
import { CATALOGS_API } from '@/constants/api';

const getCatalogs = async () => {
  const result = await httpRequest.get(CATALOGS_API.getCatalogs.api);
  return result?.data?.items;
};

const useGetCatalogs = () => {
  const { data, isLoading, refetch } = useQuery(CATALOGS_API.getCatalogs.name, getCatalogs, { staleTime: 0, cacheTime: 0, });

  const catalogs = useMemo(() => {
    return data;
  }, [data]);

  return {
    data: catalogs || [],
    isLoading,
    refetch,
  };
};

export default useGetCatalogs;
