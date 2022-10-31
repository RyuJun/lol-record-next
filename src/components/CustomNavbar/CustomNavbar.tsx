/* eslint-disable curly */
/* eslint-disable multiline-ternary */
/* eslint-disable @typescript-eslint/indent */
import { Card, Input, Navbar, Text, User } from '@nextui-org/react';
import React, { useCallback, useEffect, useId, useState } from 'react';

import { CustomNavbarContainer } from './CustomNavbar.styles';
import { Loading } from '@nextui-org/react';
import { LocalStorage } from '@/shared/configs/storage';
import Logo from '@/components/Logo/Logo';
import { CDNS, OPGG_IMG_URL } from '@/shared/constants/common.constants';
import { RiotAPI } from '@/shared/apis/RiotApi';
import { SearchIcon } from '@/components/SearchIcon/SearchIcon';
import debounce from 'lodash/debounce';
import { useRouter } from 'next/router';
import { useSummonerStore } from '@/stores/useSummonerStore';

const CustomNavbar = (): React.ReactElement => {
  const { summoner, setSummoner } = useSummonerStore();

  const [isSelectedSummoner, setIsSelectedSummoner] = useState(false);
  const [isListVisible, setIsListVisible] = useState(false);
  const [loading, setIsLoading] = useState(null);
  const [recentUser, setRecentUser] = useState([]);

  const searchInputId = useId();

  const router = useRouter();

  const handleOnMoveDetail = (userInfo) => {
    setIsSelectedSummoner(true);
    setIsListVisible(false);

    if (!recentUser.filter((user) => user.name === userInfo.name).length) {
      LocalStorage.setItem('recentUser', JSON.stringify([...recentUser, userInfo]));
    }

    router.push(`/detail/${userInfo.puuid}?&summonerId=${userInfo.id}`);
  };

  const handleOnReset = () => {
    setSummoner(null);
    setIsSelectedSummoner(false);
    setIsListVisible(false);
  };

  const handleOnSearchSummoner = debounce((e) => {
    if (e.target.value.length) {
      setIsLoading(true);
      RiotAPI.get(`/summoner/v4/summoners/by-name/${encodeURI(e.target.value)}`)
        .then((res: any) => {
          setSummoner(res);
          setIsLoading(false);
        })
        .catch(() => setIsLoading(false))
        .finally(() => setIsLoading(false));
    }
  }, 500);

  useEffect(() => {
    setRecentUser(JSON.parse(LocalStorage.getItem('recentUser') || '[]'));
  }, [isListVisible]);

  useEffect(() => {
    if (!summoner) router.push('/');
    else setIsSelectedSummoner(true);

    if (router.pathname === '/') handleOnReset();
  }, [router.pathname]);

  return (
    <CustomNavbarContainer isSelectedSummoner={isSelectedSummoner} isListVisible={isListVisible}>
      <Navbar className="navbar-wrapper" isBordered variant="sticky">
        <Navbar.Brand className="navbar-brand" hideIn="xs">
          <Logo />
        </Navbar.Brand>
        {isSelectedSummoner && !isListVisible && summoner ? (
          <Navbar.Content className="navbar-summoner-info">
            <User src={CDNS.profile_icon(summoner.profileIconId)} name={`${summoner.name} (lv ${summoner.summonerLevel})`} size="lg" />
          </Navbar.Content>
        ) : null}
        <Navbar.Content className="navbar-summoner-search-area">
          <Navbar.Item>
            <>
              <Input
                className="navbar-summoner-search-input"
                id={searchInputId}
                bordered
                labelPlaceholder={isSelectedSummoner ? '' : 'Search'}
                color="secondary"
                clearable
                contentLeft={<SearchIcon fill="var(--nextui-colors-accents6)" size={16} />}
                contentLeftStyling={false}
                onFocus={() => setIsListVisible(true)}
                onBlur={() => setTimeout(() => setIsListVisible(false), 500)}
                onClearClick={() => setIsListVisible(false)}
                onChange={handleOnSearchSummoner}
              />
              <Card className="navbar-summoner-search-list">
                <Card.Body>
                  <Text h6>검색결과</Text>
                  {!summoner || loading ? (
                    <div className="flex-container justify-center items-center w-full h-full">
                      <Loading type="points-opacity" size="sm" color="secondary" />
                    </div>
                  ) : (
                    <User
                      src={CDNS.profile_icon(summoner.profileIconId)}
                      name={`${summoner.name} (lv ${summoner.summonerLevel})`}
                      size="lg"
                      onClick={() => handleOnMoveDetail(summoner)}
                    />
                  )}

                  <Text h6>최근 검색기록</Text>
                  {recentUser.length
                    ? recentUser.map((user) => (
                        <User
                          key={user.id}
                          src={CDNS.profile_icon(user.profileIconId)}
                          name={`${user.name} (lv ${user.summonerLevel})`}
                          size="lg"
                          onClick={() => {
                            setSummoner(user);
                            handleOnMoveDetail(user);
                          }}
                        />
                      ))
                    : null}
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
