import QUERY_KEYS from '@/shared/apis/queryKeys';
import { RiotAPI } from '@/shared/apis/RiotApi';
import { useQuery } from 'react-query';

interface IuseQueryGetLeague {
  leagueId: string;
  queueType: string;
  tier: string;
  rank: string;
  summonerId: string;
  summonerName: string;
  leaguePoints: number;
  wins: number;
  losses: number;
  veteran: boolean;
  inactive: boolean;
  freshBlood: boolean;
  hotStreak: boolean;
}

export default function useQueryGetLeague(summonerId) {
  return useQuery(useQueryGetLeague.getKeys(), () => useQueryGetLeague.fetcher(summonerId), {
    staleTime: Infinity,
    retry: false,
  });
}

useQueryGetLeague.getKeys = () => [QUERY_KEYS.GET_LEAGUE];
useQueryGetLeague.fetcher = (summonerId, uri = '') => RiotAPI.get<IuseQueryGetLeague[]>(`${uri}/league/v4/entries/by-summoner/${summonerId}`);
