import { useMemo } from 'react';
import { useQuery } from 'react-query';

import httpRequest from '@/configs/api';
import { SETTINGS_API } from '@/constants/api';

const getSettings = async () => {
  const result = await httpRequest.get(SETTINGS_API.getSettings.api);
  return result?.data?.items;
};

const useGetSettings = () => {
  const { data, isLoading, refetch } = useQuery(SETTINGS_API.getSettings.name, getSettings, { staleTime: 0, cacheTime: 0, });

  const settings = useMemo(() => {
    return data;
  }, [data]);

  return {
    data: settings || [],
    isLoading,
    refetch,
  };
};

export default useGetSettings;
