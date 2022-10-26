import QUERY_KEYS from '@/shared/apis/queryKeys';
import { RiotAPIAsia } from '@/shared/apis/RiotApi';
import { useQuery } from 'react-query';

export default function useQueryGetMatches(matchList) {
  return useQuery(useQueryGetMatches.getKeys(), () => Promise.all(useQueryGetMatches.fetcher(matchList)), {
    staleTime: Infinity,
    retry: false,
  });
}

useQueryGetMatches.getKeys = () => [QUERY_KEYS.GET_MATCHES];
useQueryGetMatches.fetcher = (matchList, uri = '') => matchList.map((matchId) => RiotAPIAsia.get(`${uri}/match/v5/matches/${matchId}`));
