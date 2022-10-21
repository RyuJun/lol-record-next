import { Card, Input, Navbar, Spacer, Text, User } from '@nextui-org/react';
import { OPGG_IMG_URL, REQUESTS_OPERATION } from '@/shared/constants/common.constants';
import React, { useId, useMemo, useRef, useState } from 'react';

import { CustomNavbarContainer } from './CustomNavbar.styles';
import { IMutationProps } from '@/shared/types/common.types';
import { Loading } from '@nextui-org/react';
import Logo from '@/components/Logo/Logo';
import QUERY_KEYS from '@/shared/apis/queryKeys';
import { RiotAPI } from '@/shared/apis/RiotApi';
import { SearchIcon } from '@/components/SearchIcon/SearchIcon';
import debounce from 'lodash/debounce';
import { setConstantValue } from 'typescript';
import styled from '@emotion/styled';
import { useMutation } from 'react-query';
import useQueryGetSummoners from './CustomNavbar.hooks';

const CustomNavbar = (): React.ReactElement => {
  const [isListVisible, setIsListVisible] = useState(false);
  const [loading, setIsLoading] = useState(null);
  const [isSelectedSummoner, setIsSelectedSummoner] = useState(false);
  const [summoner, setSummoner] = useState(null);
  const searchInputId = useId();

  const { data: summonerData, isFetching }: any = useQueryGetSummoners(null);
  const getProfileIconSrc = useMemo(() => `${OPGG_IMG_URL}/profile_icons/profileIcon${summoner?.profileIconId}.jpg`, [summoner]);

  const handleSearchSummoner = debounce((e) => {
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
  }, 1000);

  return (
    <CustomNavbarContainer isSelectedSummoner={isSelectedSummoner} isListVisible={isListVisible}>
      <Navbar className="navbar-wrapper" isBordered variant="sticky">
        <Navbar.Brand className="navbar-brand" hideIn="xs">
          <Logo />
          ㅆㅆㅆㅆ
        </Navbar.Brand>
        {isSelectedSummoner && !isListVisible ? (
          <Navbar.Content className="navbar-summoner-info">
            <User src={getProfileIconSrc} name={`${summonerData.name} (lv)${summonerData.summonerLevel}`} size="lg" />
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
                onBlur={() => setTimeout(() => setIsListVisible(false), 1000)}
                onClearClick={() => setIsListVisible(false)}
                onChange={handleSearchSummoner}
              />
              <Card className="navbar-summoner-search-list">
                <Card.Body>
                  <Text h6>Result</Text>
                  {!summoner || loading ? (
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
