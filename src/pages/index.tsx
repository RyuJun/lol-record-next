import Layout from '@/components/Layout/Layout';
import type { NextPage } from 'next';
import React from 'react';

const Home: NextPage = (): React.ReactElement => {
  return (
    <Layout>
      <div className="intro-wrapper">
        <img src="https://opgg-static.akamaized.net/logo/20220829091001.a10d5ec86a664da2963553fab72d467d.png?image=q_auto,f_png,w_auto&amp;v=1661751970892" alt="OP.GG logo (카서스)" title="카서스" />
      </div>
    </Layout>
  );
};

export default Home;
