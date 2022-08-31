import { Input, Navbar } from '@nextui-org/react';
import React, { useId, useState } from 'react';

import { IMutationProps } from '@/shared/utils/common.type';
import { Loading } from '@nextui-org/react';
import QUERY_KEYS from '@/shared/apis/queryKeys';
import { REQUESTS_OPERATION } from '@/shared/utils/common.constants';
import { SearchIcon } from '@/components/SearchIcon/SearchIcon';
import debounce from 'lodash/debounce';
import { riotAPI } from '@/shared/apis/riot';
import { useMutation } from 'react-query';
import { useTheme as useNextTheme } from 'next-themes';
import { useTheme } from '@nextui-org/react';

const CustomNavbar = (): React.ReactElement => {
  const { setTheme } = useNextTheme();
  const { isDark, type } = useTheme();
  const [summoner, setSummoner] = useState('');
  const searchInputId = useId();
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
    <Navbar
      isBordered
      variant="sticky"
      css={{
        top: 'calc(50% - 38px)',
        background: 'transparent',
        border: 'none',
        '& > .nextui-navbar-container': {
          gap: 20,
          height: 100,
        },
      }}
    >
      <Navbar.Brand hideIn="xs" css={{ '@xs': { w: '12%' } }}>
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
        {/* <Navbar.Item>
        <Switch color="secondary" checked={isDark} onChange={(e) => setTheme(e.target.checked ? 'dark' : 'light')} />
      </Navbar.Item> */}
      </Navbar.Content>
    </Navbar>
  );
};

export default CustomNavbar;
