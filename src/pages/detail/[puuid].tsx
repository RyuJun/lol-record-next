import { Card, Col, Grid, Progress, Row, Text, User } from '@nextui-org/react';
import { OPGG_IMG_URL, RIOT_API_URL } from '@/shared/constants/common.constants';
import React, { useCallback, useEffect, useMemo } from 'react';
import { filter, forEach, unionBy } from 'lodash';

/* eslint-disable nonblock-statement-body-position */
import { SummonerContainer } from '@/shared/styles/pages/summoner';
import { dehydrate } from 'react-query';
import queryClient from '@/shared/configs/queryClient';
import useQueryGetLeague from '@/hooks/useQueryGetLeague.hooks';
// import useMatchListIds from '@/hooks/useMatchListIds.hooks';
import useQueryGetMatches from '@/hooks/useQueryGetMatches.hooks';
import useQueryGetMatchesIds from '@/hooks/useQueryGetMatchesIds.hooks';
import { useSummonerStore } from '@/stores/useSummonerStore';

export async function getServerSideProps(ctx) {
  const { query } = ctx;
  const { puuid, summonerId } = query;

  const matchList = await useQueryGetMatchesIds.fetcher(puuid, 0, 20, 'ranked', RIOT_API_URL.asia);

  await Promise.all([
    queryClient.prefetchQuery(useQueryGetLeague.getKeys(), () => useQueryGetLeague.fetcher(summonerId, RIOT_API_URL.kr)),
    queryClient.prefetchQuery(useQueryGetMatches.getKeys(), () => Promise.all(useQueryGetMatches.fetcher(matchList, RIOT_API_URL.asia))),
  ]);

  return { props: { dehydratedState: dehydrate(queryClient), matchList } };
}

const getQueueType = (type) => {
  switch (type) {
    case 'RANKED_SOLO_5x5':
      return '솔로 랭크';
    default:
      return '';
  }
};
const getWiningRate = (win, lose) => (win / (win + lose)) * 100;

const Summoner = ({ matchList }): React.ReactElement => {
  const { summoner } = useSummonerStore();
  const { data: leagueData, isFetching: leagueFetching } = useQueryGetLeague(summoner?.id);
  const { data: idsData, isFetching: idsIsFetching } = useQueryGetMatchesIds({ initialData: matchList, puuid: summoner?.puuid, start: 0, count: 20, type: 'ranked' });
  const { data: detailData, isFetching: detailIsFetching } = useQueryGetMatches(matchList);

  const getWins = useMemo(() => filter(detailData, (detail) => filter(detail.info.participants, (user) => user.summonerId === summoner.id && user.win).length), [detailData]);
  const getLose = useMemo(() => filter(detailData, (detail) => filter(detail.info.participants, (user) => user.summonerId === summoner.id && !user.win).length), [detailData]);

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
                <Col css={{ width: 'auto' }}>
                  <Text css={{ color: '$accents7', fontWeight: '$semibold', fontSize: '$sm', textAlign: 'right' }}>{`${leagueData[0].wins}승 ${leagueData[0].losses}패`}</Text>
                  <Text css={{ color: '$accents7', fontWeight: '$semibold', fontSize: '$sm', textAlign: 'right' }}>
                    {`전체 승률 ${Math.floor(getWiningRate(leagueData[0].wins, leagueData[0].losses))}%`}
                  </Text>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Grid>
        <Grid xs={12} sm={8}>
          <Card isHoverable>
            <Card.Header>
              <Text size={12}>최근 20전 승률</Text>
            </Card.Header>
            <Card.Divider />
            <Card.Body css={{ gap: 20 }}>
              <Row wrap="nowrap" justify="space-between" align="center">
                <Progress css={{ flexBasis: '70%', flexShrink: 0 }} value={30} shadow color="secondary" status="secondary" />
                <Col>
                  <Text
                    css={{ color: '$accents7', fontWeight: '$semibold', fontSize: '$sm', textAlign: 'right' }}
                  >{`${detailData.length}전 ${getWins.length}승 ${getLose.length}패`}</Text>
                </Col>
              </Row>
              <Text> {`승률 ${Math.floor(getWiningRate(getWins.length, getLose.length))}%`}</Text>

              {/* <Text css={{ color: '$accents7', fontWeight: '$semibold', fontSize: '$sm', textAlign: 'right' }}>{`20전 ${getWins.length}승 ${getLose.length}패`}</Text> */}
            </Card.Body>
          </Card>
        </Grid>
        <Grid xs={12}></Grid>
      </Grid.Container>
    </SummonerContainer>
  );
};

export default Summoner;
