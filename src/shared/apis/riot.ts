import apiBase from './apiBase';

export const riotAPI = apiBase({
  baseURL: '/lol',
  headers: { 'X-Riot-Token': process.env.NEXT_PUBLIC_RIOT_API_KEY },
});
