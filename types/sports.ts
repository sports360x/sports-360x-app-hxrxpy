
export type League = 'ALL' | 'MLB' | 'NBA' | 'NFL' | 'SOCCER' | 'TENNIS';

export type GameState = 'LIVE' | 'UPCOMING' | 'FINAL';

export interface Team {
  id: string;
  abbr: string;
  name: string;
  logo: string;
  league: League;
  record?: {
    wins: number;
    losses: number;
    ties?: number;
  };
  atsRecord?: {
    wins: number;
    losses: number;
    pushes: number;
  };
  streak?: {
    type: 'W' | 'L';
    count: number;
  };
  injuries?: PlayerInjury[];
}

export interface PlayerInjury {
  playerId: string;
  playerName: string;
  position: string;
  injury: string;
  status: 'OUT' | 'QUESTIONABLE' | 'DOUBTFUL' | 'PROBABLE';
  expectedReturn?: string;
}

export interface GamePeriod {
  label: string;
  home: number;
  away: number;
}

export interface WeatherConditions {
  temperature: number;
  condition: string;
  windSpeed: number;
  humidity: number;
  precipitation: number;
}

export interface PlayerProps {
  playerId: string;
  playerName: string;
  position: string;
  team: string;
  props: {
    points?: number;
    rebounds?: number;
    assists?: number;
    yards?: number;
    touchdowns?: number;
    strikeouts?: number;
    hits?: number;
    goals?: number;
    aces?: number;
  };
  trends: {
    last5Games: number[];
    season: number;
    vsOpponent: number;
  };
}

export interface Game {
  id: string;
  league: League;
  date: string;
  state: GameState;
  statusText: string;
  homeTeam: Team;
  awayTeam: Team;
  homeScore: number;
  awayScore: number;
  periods: GamePeriod[];
  startTime?: string;
  weather?: WeatherConditions;
  venue?: string;
  playerProps?: PlayerProps[];
  recentPerformance?: {
    homeTeam: {
      last10: string; // e.g., "7-3"
      ats: string; // e.g., "6-4"
      pace?: number;
    };
    awayTeam: {
      last10: string;
      ats: string;
      pace?: number;
    };
  };
  keyMatchups?: {
    description: string;
    advantage: 'home' | 'away' | 'neutral';
  }[];
}

export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  author: string;
  publishedAt: string;
  league: League;
  isBreaking: boolean;
  imageUrl?: string;
  videoUrl?: string;
}

export interface PlayerStreak {
  playerId: string;
  playerName: string;
  team: string;
  position: string;
  league: League;
  streakType: 'hot' | 'cold';
  metric: string;
  currentValue: number;
  streakLength: number;
  description: string;
}

export interface TeamStreak {
  teamId: string;
  teamName: string;
  league: League;
  streakType: 'winning' | 'losing' | 'ats_winning' | 'ats_losing';
  streakLength: number;
  description: string;
  nextGame?: {
    opponent: string;
    date: string;
    isHome: boolean;
  };
}
