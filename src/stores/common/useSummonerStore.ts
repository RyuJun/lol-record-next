import { Nullable } from '@/shared/utils/common.type';
import create from 'zustand';

interface ISummonerStore {
  accountId: Nullable<string>;
  id: Nullable<string>;
  name: Nullable<string>;
  profileIconId: Nullable<number>;
  puuid: Nullable<string>;
  revisionDate: Nullable<number>;
  summonerLevel: Nullable<number>;
  // set: (props) => void;
}

export const useSummonerStore = create<ISummonerStore>((set) => ({
  accountId: null,
  id: null,
  name: null,
  profileIconId: null,
  puuid: null,
  revisionDate: null,
  summonerLevel: null,
  // set: (props: string) => set(() => ({ loginPath: props })),
}));
