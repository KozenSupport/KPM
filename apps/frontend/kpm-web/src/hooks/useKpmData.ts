import { useQuery, useQueryClient } from '@tanstack/react-query';
import { loadAppData } from '../services/kpmApi';

export const appDataQueryKey = ['kpm', 'app-data'] as const;

export function useKpmData() {
  return useQuery({
    queryKey: appDataQueryKey,
    queryFn: loadAppData,
    staleTime: 30_000,
    refetchOnWindowFocus: false,
  });
}

export function useRefreshKpmData() {
  const queryClient = useQueryClient();
  return () => queryClient.invalidateQueries({ queryKey: appDataQueryKey });
}
