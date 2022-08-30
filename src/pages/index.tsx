import { Switch, useTheme } from '@nextui-org/react';

import { Button } from '@nextui-org/react';
import { Loading } from '@nextui-org/react';
import type { NextPage } from 'next';
import QUERY_KEYS from '@/shared/apis/queryKeys';
import React from 'react';
import { riotAPI } from '@/shared/apis/riot';
import styled from '@emotion/styled';
import { useTheme as useNextTheme } from 'next-themes';
import { useQuery } from 'react-query';

export const Wrapper = styled.div<React.CSSProperties>`
  background: red;
`;

const Home: NextPage = (): React.ReactElement => {
  const { setTheme } = useNextTheme();
  const { isDark, type } = useTheme();
  const { isLoading, data } = useQuery([QUERY_KEYS.SOMMONER], () => riotAPI.get(`/summoner/v4/summoners/by-name/${encodeURI('류뚝딱')}`), {
    staleTime: 5000,
  });
  if (isLoading) return <Loading size="md" />;
  return (
    <>
      <Wrapper>{JSON.stringify(data)}</Wrapper>
      <Button>Click me</Button>

      <div>
        The current theme is: {type}
        <Switch checked={isDark} onChange={(e) => setTheme(e.target.checked ? 'dark' : 'light')} />
      </div>
    </>
  );
};

export default Home;
