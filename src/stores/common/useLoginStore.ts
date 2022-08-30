import create from 'zustand';

interface ILoginStore {
  loginPath: string;
  setLoginPath: (props) => void;
}

export const useLoginStore = create<ILoginStore>((set) => ({
  loginPath: 'test login path',
  setLoginPath: (props: string) => set(() => ({ loginPath: props })),
}));
