export const REQUESTS_OPERATION = {
  GET: 'get',
  POST: 'post',
  PATCH: 'patch',
  PUT: 'put',
  DELETE: 'delete',
} as const;

export const MAIN_VISUAL = {
  src: 'https://opgg-static.akamaized.net/logo/20220829091001.a10d5ec86a664da2963553fab72d467d.png?image=q_auto,f_png,w_auto&amp;v=1661751970892',
};

export const DEFAULT_STAIL_TIME = 5000;

export const OPGG_IMG_URL = 'https://opgg-static.akamaized.net/images';
export const OPGG_ICON_URL = 'https://s-lol-web.op.gg/images';
export const RIOT_API_URL = {
  kr: 'https://kr.api.riotgames.com/lol',
  asia: 'https://asia.api.riotgames.com/lol',
};

export const CDNS = {
  profile_icon: (id) => `http://ddragon.leagueoflegends.com/cdn/12.20.1/img/profileicon/${id}.png`,
  champion_img: (champ) => `http://ddragon.leagueoflegends.com/cdn/12.20.1/img/champion/${champ}.png`,
  champion_json: (champ) => `https://ddragon.leagueoflegends.com/cdn/12.20.1/data/ko_KR/champion/${champ}.json`,
};

export const getQueueType = (type) => {
  switch (type) {
    case 'RANKED_SOLO_5x5':
      return '솔로 랭크';
    default:
      return '';
  }
};

export const getWiningRate = (win, lose) => (win / (win + lose)) * 100;

export const getDisplayedAt = (minute) => {
  const hours = minute / 60;
  const days = hours / 24;
  const weeks = days / 7;
  const months = days / 30;
  const years = days / 365;

  if (minute < 5) return '방금 전';
  if (minute < 60) return `${Math.floor(minute)}분 전`;
  if (hours < 24) return `${Math.floor(hours)}시간 전`;
  if (days < 7) return `${Math.floor(days)}일 전`;
  if (weeks < 5) return `${Math.floor(weeks)}주 전`;
  if (months < 12) return `${Math.floor(months)}개월 전`;
  return `${Math.floor(years)}년 전`;
};
