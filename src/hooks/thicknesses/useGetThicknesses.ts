import { useMemo } from 'react';
import { useQuery } from 'react-query';

import httpRequest from '@/configs/api';
import { THICKNESSES_API } from '@/constants/api';

const getThicknesses = async () => {
  const result = await httpRequest.get(THICKNESSES_API.getThicknesses.api);
  return result?.data?.items;
};

const useGetThicknesses = () => {
  const { data, isLoading, refetch } = useQuery(THICKNESSES_API.getThicknesses.name, getThicknesses, { staleTime: 0, cacheTime: 0, });

  const thicknesses = useMemo(() => {
    return data;
  }, [data]);

  return {
    data: thicknesses || [],
    isLoading,
    refetch,
  };
};

export default useGetThicknesses;
