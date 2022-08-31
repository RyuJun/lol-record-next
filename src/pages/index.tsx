import { Input, Link, Navbar, Switch } from '@nextui-org/react';
import React, { useId, useState } from 'react';
import { useMutation, useQuery } from 'react-query';

import { IMutationProps } from '@/shared/utils/common.type';
import { Layout } from '@/components/Layout/Layout';
import { Loading } from '@nextui-org/react';
import type { NextPage } from 'next';
import QUERY_KEYS from '@/shared/apis/queryKeys';
import { REQUESTS_OPERATION } from '@/shared/utils/common.constants';
import debounce from 'lodash/debounce';
import { riotAPI } from '@/shared/apis/riot';
import styled from '@emotion/styled';
import throttle from 'lodash/throttle';
import { useTheme as useNextTheme } from 'next-themes';
import { useTheme } from '@nextui-org/react';

export const Wrapper = styled.div<React.CSSProperties>`
  background: red;
`;
const SearchIcon = ({ size, fill, width = 24, height = 24, ...props }) => {
  return (
    <svg fill="none" height={size || height} viewBox="0 0 24 24" width={size || width} {...props}>
      <path d="M11.5 21a9.5 9.5 0 1 0 0-19 9.5 9.5 0 0 0 0 19ZM22 22l-2-2" stroke={fill} strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
    </svg>
  );
};
const Home: NextPage = (): React.ReactElement => {
  const { setTheme } = useNextTheme();
  const { isDark, type } = useTheme();
  const searchInputId = useId();
  const [summoner, setSummoner] = useState('');

  const {
    mutate: searchSummonerMutate,
    data,
    isLoading,
  } = useMutation((data: IMutationProps) => riotAPI.mutation(data), {
    onMutate: ({ operation }) => ({
      key: [QUERY_KEYS.SOMMONER],
      onSuccess: (res, req: any) => {
        console.log(res.data);
        setSummoner(res.data);
      },
    }),
  });

  const handleSearchSummoner = debounce((e) => {
    searchSummonerMutate({ operation: REQUESTS_OPERATION.GET, url: `/summoner/v4/summoners/by-name/${encodeURI(e.target.value)}` });
  }, 1000);

  if (isLoading) {
    return (
      <div className="flex-container justify-center items-center w-full h-full">
        <Loading type="gradient" size="xl" color="secondary" />
      </div>
    );
  }
  return (
    <Layout>
      <div className="intro-wrapper">
        <img src="https://opgg-static.akamaized.net/logo/20220829091001.a10d5ec86a664da2963553fab72d467d.png?image=q_auto,f_png,w_auto&amp;v=1661751970892" alt="OP.GG logo (카서스)" title="카서스" />
      </div>
      <Navbar
        isBordered
        variant="sticky"
        css={{
          top: 'calc(50% - 38px)',
          background: 'transparent',
          border: 'none',
          '& > .nextui-navbar-container': {
            gap: 20,
          },
        }}
      >
        <Navbar.Brand css={{ '@xs': { w: '12%' } }}>
          <div className="logo-wrapper logo-bg-animate">
            <svg className="logo" width="100%" height="100%" viewBox="0 0 565 140">
              <text x="30" y="90" fill="rgba(126, 58, 242, var(--bg-opacity)" fontSize="100" fontFamily="'Russo One'">
                lol-record
              </text>
            </svg>
          </div>
        </Navbar.Brand>
        <Navbar.Content css={{ width: '100%', '@xsMax': { w: '80%', jc: 'space-between' } }}>
          <Navbar.Item
            css={{
              width: '100%',
              '@xsMax': { w: '100%', jc: 'center' },
              '& .nextui-input-main-container': {
                width: '100%',
              },
            }}
          >
            <Input
              id={searchInputId}
              underlined
              labelPlaceholder="Search Summoner"
              color="secondary"
              clearable
              contentLeft={<SearchIcon fill="var(--nextui-colors-accents6)" size={16} />}
              contentLeftStyling={false}
              css={{
                width: '100%',
                '@xsMax': { mw: '300px' },
                '& .nextui-input-content--left': {
                  h: '100%',
                  ml: '$4',
                  dflex: 'center',
                  padding: 10,
                },
              }}
              onChange={handleSearchSummoner}
            />
          </Navbar.Item>
          <Navbar.Item>
            <Switch color="secondary" checked={isDark} onChange={(e) => setTheme(e.target.checked ? 'dark' : 'light')} />
          </Navbar.Item>
        </Navbar.Content>
      </Navbar>
    </Layout>
  );
};

export default Home;
// <>
//   <Wrapper>{JSON.stringify(data)}</Wrapper>
//   <Button>Click me</Button>

//   <div>
//     The current theme is: {type}
//     <Switch checked={isDark} onChange={(e) => setTheme(e.target.checked ? 'dark' : 'light')} />
//   </div>
// </>
