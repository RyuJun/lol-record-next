import QUERY_KEYS from '@/shared/apis/queryKeys';
import { RiotAPIAsia } from '@/shared/apis/RiotApi';
import { string } from 'yup';
import { useQuery } from 'react-query';

interface IuseQueryGetMatchesIds {
  initialData: string[];
  puuid: string;
  start: number;
  count: number;
  type: string;
}

export default function useQueryGetMatchesIds({ initialData, puuid, start, count, type }: IuseQueryGetMatchesIds) {
  return useQuery(useQueryGetMatchesIds.getKeys(start, count), () => useQueryGetMatchesIds.fetcher(puuid, start, count, type), {
    staleTime: Infinity,
    retry: false,
    initialData,
  });
}

useQueryGetMatchesIds.getKeys = (start, count) => [`${QUERY_KEYS.GET_MATCHES_IDS}_${start}_${count}`];
useQueryGetMatchesIds.fetcher = (puuid, start, count, type, uri = '') =>
  RiotAPIAsia.get(`${uri}/match/v5/matches/by-puuid/${puuid}/ids?start=${start}&count=${count}&type=${type}`);
