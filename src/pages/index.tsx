import Layout from '@/components/Layout/Layout';
import { MAIN_VISUAL } from '@/shared/constants';
import type { NextPage } from 'next';
import React from 'react';

const Home: NextPage = (): React.ReactElement => {
  return (
    <Layout>
      <div className="intro-wrapper">
        <img src={MAIN_VISUAL.src} alt={MAIN_VISUAL.alt} title={MAIN_VISUAL.title} />
      </div>
    </Layout>
  );
};

export default Home;
