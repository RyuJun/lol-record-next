import { HomeContainer } from '@/shared/constants/pages';
import Layout from '@/components/Layout/Layout';
import { MAIN_VISUAL } from '@/shared/constants/common.constants';
import type { NextPage } from 'next';
import React from 'react';

const Home: NextPage = (): React.ReactElement => {
  return (
    <HomeContainer>
      <img src={MAIN_VISUAL.src} alt={MAIN_VISUAL.alt} title={MAIN_VISUAL.title} />
    </HomeContainer>
  );
};

export default Home;
