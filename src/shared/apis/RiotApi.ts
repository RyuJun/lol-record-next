import apiBase from './apiBase';

export const RiotAPI = apiBase({
  baseURL: '/lol',
  headers: { 'X-Riot-Token': process.env.NEXT_PUBLIC_RIOT_API_KEY },
});

export const RiotAPIAsia = apiBase({
  baseURL: '/asia/lol',
  headers: { 'X-Riot-Token': process.env.NEXT_PUBLIC_RIOT_API_KEY },
});
