import { Nullable } from '@/shared/types/common.types';
import create from 'zustand';

interface ISummoner {
  accountId: string;
  id: string;
  name: string;
  profileIconId: number;
  puuid: string;
  revisionDate: number;
  summonerLevel: number;
}

interface ISummonerStore {
  summoner: Nullable<ISummoner>;
  setSummoner: (props) => void;
}

export const useSummonerStore = create<ISummonerStore>((set) => ({
  summoner: null,
  setSummoner: (props: Nullable<ISummoner>) => set(() => ({ summoner: props })),
}));
