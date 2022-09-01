import { Card, Input, Navbar, Spacer, Text, User } from '@nextui-org/react';
import React, { useId, useMemo, useRef, useState } from 'react';

import { Loading } from '@nextui-org/react';
import Logo from '@/components/Logo/Logo';
import { OPGG_IMG_URL } from '@/shared/constants';
import { SearchIcon } from '@/components/SearchIcon/SearchIcon';
import debounce from 'lodash/debounce';
import { riotAPI } from '@/shared/apis/riot';
import styled from '@emotion/styled';

interface ICustomNavbarContainerProps {
  isSelectedSummoner: boolean;
  isListVisible: boolean;
}
const CustomNavbarContainer = styled.div<ICustomNavbarContainerProps>((props) => ({
  position: 'sticky',
  top: props.isSelectedSummoner ? 0 : 'calc(50% - 60px)',
  zIndex: 1,
  '.navbar-wrapper': {
    background: 'transparent',
    transition: '.5s all',
    border: 'none',
    '& > .nextui-navbar-container': {
      gap: 20,
      height: props.isSelectedSummoner ? 'auto' : 120,
      '& .navbar-brand': {
        width: '25%',
      },
      '& .navbar-summoner-info': {
        width: '70%',
      },
      '& .navbar-summoner-search-area': {
        width: '70%',
        '@media (max-width: 650px)': {
          width: '100%',
        },
        '& > .nextui-navbar-item': { width: '100%' },
        '& .nextui-input-main-container': { width: '100%' },
      },
      '& .navbar-summoner-search-input': {
        width: '100%',
        '& .nextui-input-content--left': { padding: 10 },
      },
      '& .navbar-summoner-search-list': {
        position: 'absolute',
        top: 50,
        overflowY: 'auto',
        maxHeight: 300,
        display: props.isListVisible ? 'block' : 'none',
        '& > div': { gap: 20 },
      },
    },
  },
}));

const CustomNavbar = (): React.ReactElement => {
  const [isLoading, setIsLoading] = useState(false);
  const [isListVisible, setIsListVisible] = useState(false);
  const [isSelectedSummoner, setIsSelectedSummoner] = useState(false);
  const [summoner, setSummoner] = useState(null);
  const searchInputId = useId();

  const getProfileIconSrc = useMemo(() => `${OPGG_IMG_URL}/profile_icons/profileIcon${summoner?.profileIconId}.jpg`, [summoner]);

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
    <CustomNavbarContainer isSelectedSummoner={isSelectedSummoner} isListVisible={isListVisible}>
      <Navbar className="navbar-wrapper" isBordered variant="sticky">
        <Navbar.Brand className="navbar-brand" hideIn="xs">
          <Logo />
        </Navbar.Brand>
        {isSelectedSummoner && !isListVisible ? (
          <Navbar.Content className="navbar-summoner-info">
            <User src={getProfileIconSrc} name={`${summoner.name} (lv)${summoner.summonerLevel}`} size="lg" />
          </Navbar.Content>
        ) : null}

        <Navbar.Content className="navbar-summoner-search-area">
          <Navbar.Item>
            <>
              <Input className="navbar-summoner-search-input" id={searchInputId} bordered labelPlaceholder={isSelectedSummoner ? '' : 'Search'} color="secondary" clearable contentLeft={<SearchIcon fill="var(--nextui-colors-accents6)" size={16} />} contentLeftStyling={false} onFocus={() => setIsListVisible(true)} onBlur={() => setTimeout(() => setIsListVisible(false), 1000)} onClearClick={() => setIsListVisible(false)} onChange={handleSearchSummoner} />
              <Card className="navbar-summoner-search-list">
                <Card.Body>
                  <Text h6>Result</Text>
                  {!summoner || isLoading ? (
                    <div className="flex-container justify-center items-center w-full h-full">
                      <Loading type="gradient" size="sm" color="secondary" />
                    </div>
                  ) : (
                    <User
                      src={getProfileIconSrc}
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
    </CustomNavbarContainer>
  );
};

export default CustomNavbar;
