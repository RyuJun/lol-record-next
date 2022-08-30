import { Button } from '@nextui-org/react';
import { Loading } from '@nextui-org/react';
import type { NextPage } from 'next';
import QUERY_KEYS from '@/shared/apis/queryKeys/example';
import React from 'react';
import { riotAPI } from '@/shared/apis/riot';
import { useQuery } from 'react-query';

const Home: NextPage = (): React.ReactElement => {
  const { isLoading, data } = useQuery([QUERY_KEYS.SOMMONER], () => riotAPI.get(`/summoner/v4/summoners/by-name/${encodeURI('류뚝딱')}`));
  if (isLoading) return <Loading size="md" />;

  return (
    <>
      <Button>Click me</Button>
    </>
  );
};

export default Home;
