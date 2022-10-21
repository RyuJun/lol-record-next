import QUERY_KEYS from '@/shared/apis/queryKeys';
import { RiotAPI } from '@/shared/apis/RiotApi';
import { useQuery } from 'react-query';

export default function useQueryGetSummoners(name) {
  return useQuery(useQueryGetSummoners.getKeys(name), () => useQueryGetSummoners.fetcher(name), {
    staleTime: Infinity,
    retry: false,
    enabled: Boolean(name),
  });
}

useQueryGetSummoners.getKeys = (name) => [QUERY_KEYS.SOMMONER, name];
useQueryGetSummoners.fetcher = (name) => RiotAPI.get(`/summoner/v4/summoners/by-name/${name}`);
