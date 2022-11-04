import { Avatar, Card, Col, Collapse, Container, Grid, Progress, Row, Text, User, Badge, Tooltip } from '@nextui-org/react';
import { CDNS, getDisplayedAt, getQueueType, getWiningRate, OPGG_ICON_URL, OPGG_IMG_URL, RIOT_API_URL } from '@/shared/constants/common.constants';
import React, { useEffect, useState } from 'react';
import { find, forEach, groupBy, reduce } from 'lodash';
import useQueryGetMatches from '@/hooks/useQueryGetMatches.hooks';

import { ICampionJson, IGetMyStatus } from '@/shared/types/common.types';
import { SummonerContainer } from '@/shared/styles/pages/summoner';
import dayjs from 'dayjs';
import { dehydrate } from 'react-query';
import queryClient from '@/shared/configs/queryClient';
import useQueryGetLeague from '@/hooks/useQueryGetLeague.hooks';
import useQueryGetMatchesIds from '@/hooks/useQueryGetMatchesIds.hooks';
import { useSummonerStore } from '@/stores/useSummonerStore';
import { CdnApi } from '@/shared/apis/CdnApitest';

export async function getServerSideProps(ctx) {
  const { query } = ctx;
  const { puuid, summonerId } = query;

  const matchList = await useQueryGetMatchesIds.fetcher(puuid, 0, 2, 'ranked', RIOT_API_URL.asia);

  await Promise.all([
    queryClient.prefetchQuery(useQueryGetLeague.getKeys(), () => useQueryGetLeague.fetcher(summonerId, RIOT_API_URL.kr)),
    queryClient.prefetchQuery(useQueryGetMatches.getKeys(), () => Promise.all(useQueryGetMatches.fetcher(matchList, RIOT_API_URL.asia))),
  ]);

  return { props: { dehydratedState: dehydrate(queryClient), matchList } };
}

const Summoner = ({ matchList }): React.ReactElement => {
  const { summoner } = useSummonerStore();
  const { data: leagueData, isFetching: leagueFetching } = useQueryGetLeague(summoner?.id);
  const { data: idsData, isFetching: idsIsFetching } = useQueryGetMatchesIds({ initialData: matchList, puuid: summoner?.puuid, start: 0, count: 2, type: 'ranked' });
  const { data: detailData, isFetching: detailIsFetching } = useQueryGetMatches(matchList);

  const [myStatus, setMyStatus] = useState<IGetMyStatus>({ win: [], lose: [], mygames: [], participants: [], favorites: null });
  const [tooltipContent, setTooltipContent] = useState(null);

  useEffect(() => {
    const result = { win: [], lose: [], mygames: [], participants: [], favorites: null };
    const favorites = {
      champion: null,
      lane: null,
      role: null,
    };

    if (summoner) {
      forEach(detailData, (detail) => {
        const participants = detail.info.participants;
        const myPlay = find(participants, (parti) => parti.summonerId === summoner.id);
        result[myPlay.win ? 'win' : 'lose'].push(myPlay);
        result.mygames.push(myPlay);
        result.participants = participants;
      });

      const getFavorite = (type: string) =>
        reduce(
          groupBy(result.mygames, (game) => game[type]),
          (acc, cur) => (acc.length > cur.length ? acc : cur),
          []
        );

      favorites.champion = getFavorite('championId');
      favorites.lane = getFavorite('lane');
      favorites.role = getFavorite('role');

      setMyStatus({ ...result, favorites });
    }
  }, [detailData, summoner]);

  const handleGetToolTipChamp = (visible, champ) => {
    if (visible && champ) {
      CdnApi.get(CDNS.champion_json(champ)).then((champDetail: Partial<ICampionJson>) => {
        const detail = champDetail.data[champ];
        setTooltipContent(
          <Container display="flex" direction="column" css={{ gap: 5, padding: 0, hedight: 30, overflowY: 'auto' }}>
            <User src={CDNS.champion_img(champ)} name={detail.name} description={detail.title} size="xl" />
            <Text css={{ color: '$accents7', fontSize: '$xs' }}>{detail.blurb}</Text>
          </Container>
        );
      });
    }
  };

  if (!detailData.length) return <></>;
  if (!myStatus.favorites) return <></>;

  return (
    <SummonerContainer>
      <Grid.Container gap={2} justify="flex-start">
        <Grid xs={12} sm={4}>
          <Card isHoverable>
            <Card.Header>
              <Text size={12}>{`${getQueueType(leagueData[0].queueType)}`}</Text>
            </Card.Header>
            <Card.Divider />
            <Card.Body>
              <Row wrap="wrap" justify="space-between" align="center">
                <User
                  src={`${OPGG_IMG_URL}/medals_new/${leagueData[0].tier.toLowerCase()}.png`}
                  name={`${leagueData[0].tier.toLowerCase()} ${leagueData[0].rank}`}
                  description={`${leagueData[0].leaguePoints} LP`}
                  size="xl"
                />
                <Col css={{ width: 'auto', pr: 10 }}>
                  <Text css={{ color: '$accents7', fontWeight: '$semibold', fontSize: '$sm', textAlign: 'right' }}>{`${leagueData[0].wins}승 ${leagueData[0].losses}패`}</Text>
                  <Text css={{ color: '$accents7', fontWeight: '$semibold', fontSize: '$sm', textAlign: 'right' }}>
                    {`전체 승률 ${Math.floor(getWiningRate(leagueData[0].wins, leagueData[0].losses))}%`}
                  </Text>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Grid>
        <Grid xs={12} sm={3}>
          <Card isHoverable>
            <Card.Header>
              <Text size={12}>최근 {myStatus.mygames.length}전 승률</Text>
            </Card.Header>
            <Card.Divider />
            <Card.Body css={{ gap: 20 }}>
              <Progress value={Math.floor(getWiningRate(myStatus.win.length, myStatus.lose.length))} shadow color="secondary" status="secondary" />
              <Row justify="space-between" align="flex-end">
                <Text
                  css={{ color: '$accents7', fontWeight: '$semibold', fontSize: '$sm' }}
                >{`${myStatus.mygames.length}전 ${myStatus.win.length}승 ${myStatus.lose.length}패`}</Text>
                <Text b size={23}>{`${Math.floor(getWiningRate(myStatus.win.length, myStatus.lose.length))}%`}</Text>
              </Row>
            </Card.Body>
          </Card>
        </Grid>
        <Grid xs={12} sm={5}>
          <Card isHoverable>
            <Card.Header>
              <Text size={12}>선호 챔피언 및 포지션 (최근 {detailData.length}게임)</Text>
            </Card.Header>
            <Card.Divider />
            <Card.Body css={{ justifyContent: 'center' }}>
              <Row wrap="wrap" justify="space-between" align="flex-start" css={{ gap: 10 }}>
                <Tooltip
                  content={tooltipContent}
                  placement="rightStart"
                  rounded
                  onVisibleChange={(visible) => handleGetToolTipChamp(visible, myStatus.favorites.champion[0].championName)}
                >
                  <User
                    src={`${OPGG_IMG_URL}/lol/champion/${myStatus.favorites.champion[0].championName}.png`}
                    name={`${myStatus.favorites.champion[0].championName}`}
                    description={`${myStatus.mygames.length}전 중 ${myStatus.favorites.champion.length}게임`}
                    size="lg"
                  />
                </Tooltip>
                <User
                  src={`${OPGG_ICON_URL}/icon/icon-position-${myStatus.favorites.role[0].role.toLowerCase()}.svg`}
                  name={`${myStatus.favorites.role[0].role}`}
                  description={`${myStatus.mygames.length}전 중 ${myStatus.favorites.role.length}게임`}
                  size="lg"
                />
              </Row>
            </Card.Body>
          </Card>
        </Grid>
        <Grid xs={12}>
          <Collapse.Group>
            {detailData.map((detail) => {
              const mygame = find(detail.info.participants, (parti) => parti.summonerId === summoner.id);
              return (
                <Collapse
                  key={detail.info.gameId}
                  title={
                    <Grid.Container gap={2} justify="flex-start">
                      <Grid sm={2}>
                        <Container display="flex" direction="column" css={{ gap: 5, padding: 0 }}>
                          <Badge color="secondary"> {getDisplayedAt(dayjs().diff(dayjs(Number(detail.info.gameEndTimestamp)), 'minute'))}</Badge>
                          <Text css={{ color: '$accents7', fontWeight: '$semibold', fontSize: '$sm' }}>{`${dayjs(
                            detail.info.gameEndTimestamp - detail.info.gameStartTimestamp
                          ).format('mm분 ss초')}`}</Text>
                          <Text color={mygame.win ? 'primary' : 'error'} b>
                            {mygame.win ? '승리' : '패배'}
                          </Text>
                        </Container>
                      </Grid>
                      <Grid sm={5}>
                        <Container display="flex" css={{ gap: 5 }}>
                          <Row>
                            <User
                              css={{ zIndex: 0, padding: 0 }}
                              src={`${OPGG_IMG_URL}/lol/champion/${myStatus.favorites.champion[0].championName}.png`}
                              name={`${mygame.kills} / ${mygame.deaths} / ${mygame.assists}`}
                              description={`${((mygame.kills + mygame.assists) / mygame.deaths).toFixed(1)} 평점`}
                              size="lg"
                            />
                          </Row>
                          <Row css={{ gap: 5 }}>
                            {new Array(6).fill(null).map((_, i) => (
                              <Avatar key={`item_${i}`} css={{ zIndex: 0 }} squared src={`${OPGG_IMG_URL}/lol/item/${mygame[`item${i}`]}.png`} size="xs" />
                            ))}
                          </Row>
                        </Container>
                      </Grid>
                      <Grid sm={5}></Grid>
                    </Grid.Container>
                  }
                >
                  <Text>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                    nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </Text>
                </Collapse>
              );
            })}
          </Collapse.Group>
        </Grid>
      </Grid.Container>
    </SummonerContainer>
  );
};

export default Summoner;
