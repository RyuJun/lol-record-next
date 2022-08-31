import { Card, Input, Navbar, Spacer, Text, User } from '@nextui-org/react';
import React, { useId, useRef, useState } from 'react';

import { Loading } from '@nextui-org/react';
import { SearchIcon } from '@/components/SearchIcon/SearchIcon';
import debounce from 'lodash/debounce';
import { riotAPI } from '@/shared/apis/riot';

const CustomNavbar = (): React.ReactElement => {
  const [isLoading, setIsLoading] = useState(false);
  const [isListVisible, setIsListVisible] = useState(false);
  const [isSelectedSummoner, setIsSelectedSummoner] = useState(false);
  const [summoner, setSummoner] = useState(null);
  const searchInputId = useId();

  const handleSearchSummoner = debounce((e) => {
    if (e.target.value.length) {
      setIsLoading(true);
      riotAPI
        .get(`/summoner/v4/summoners/by-name/${encodeURI(e.target.value)}`)
        .then((res: any) => {
          setSummoner(res);
          setIsLoading(false);
        })
        .catch(() => setIsLoading(false))
        .finally(() => setIsLoading(false));
    }
  }, 500);

  return (
    <Navbar
      isBordered
      variant="sticky"
      css={{
        top: isSelectedSummoner ? 0 : 'calc(50% - 60px)',
        background: 'transparent',
        transition: '.5s all',
        border: 'none',
        '& > .nextui-navbar-container': { gap: 20, height: isSelectedSummoner ? 'auto' : 120 },
      }}
    >
      <Navbar.Brand hideIn="xs" css={{ width: '25%' }}>
        <div className="logo-wrapper logo-bg-animate">
          <svg className="logo" width="100%" height="100%" viewBox="0 0 565 140">
            <text x="30" y="90" fill="rgba(126, 58, 242, var(--bg-opacity)" fontSize="100" fontFamily="'Russo One'">
              lol-record
            </text>
          </svg>
        </div>
      </Navbar.Brand>
      {isSelectedSummoner && !isListVisible ? (
        <Navbar.Content css={{ width: '70%' }}>
          <User src={`https://opgg-static.akamaized.net/images/profile_icons/profileIcon${summoner.profileIconId}.jpg?image=q_auto&image=q_auto,f_png,w_auto&v=1661751970709`} name={`${summoner.name} (lv)${summoner.summonerLevel}`} size="lg" />
        </Navbar.Content>
      ) : null}

      <Navbar.Content css={{ width: '70%', '@media (max-width: 650px)': { width: '100%' } }}>
        <Navbar.Item
          css={{
            width: '100%',
            '& .nextui-input-main-container': { width: '100%' },
          }}
        >
          <>
            <Input
              id={searchInputId}
              bordered
              labelPlaceholder={isSelectedSummoner ? '' : 'Search'}
              color="secondary"
              clearable
              contentLeft={<SearchIcon fill="var(--nextui-colors-accents6)" size={16} />}
              contentLeftStyling={false}
              css={{
                width: '100%',
                '& .nextui-input-content--left': { padding: 10 },
              }}
              onFocus={() => setIsListVisible(true)}
              onClearClick={() => setIsListVisible(false)}
              onBlur={() => setTimeout(() => setIsListVisible(false), 1000)}
              onChange={handleSearchSummoner}
            />
            <Card css={{ position: 'absolute', top: 50, overflowY: 'auto', maxHeight: 300, display: isListVisible ? 'block' : 'none' }}>
              <Card.Body css={{ gap: 20 }}>
                <Text h6>Result</Text>
                {!summoner || isLoading ? (
                  <div className="flex-container justify-center items-center w-full h-full">
                    <Loading type="gradient" size="sm" color="secondary" />
                  </div>
                ) : (
                  <User
                    src={`https://opgg-static.akamaized.net/images/profile_icons/profileIcon${summoner.profileIconId}.jpg?image=q_auto&image=q_auto,f_png,w_auto&v=1661751970709`}
                    name={`${summoner.name} (lv)${summoner.summonerLevel}`}
                    size="lg"
                    onClick={() => {
                      setIsSelectedSummoner(true);
                      setIsListVisible(false);
                    }}
                  />
                )}

                <Spacer />
                <Text h6>Recent Result</Text>
                <User src="https://i.pravatar.cc/150?u=a042581f4e29026704d" name="Ariana Wattson" size="lg" />
                <User src="https://i.pravatar.cc/150?u=a042581f4e29026704d" name="Ariana Wattson" size="lg" />
                <User src="https://i.pravatar.cc/150?u=a042581f4e29026704d" name="Ariana Wattson" size="lg" />
                <User src="https://i.pravatar.cc/150?u=a042581f4e29026704d" name="Ariana Wattson" size="lg" />
              </Card.Body>
            </Card>
          </>
        </Navbar.Item>
      </Navbar.Content>
    </Navbar>
  );
};

export default CustomNavbar;
