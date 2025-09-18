
export interface AIBet {
  id: string;
  league: string;
  matchup: string;
  type: string;
  aiConfidence: number;
  streakInfo: string;
  odds?: string;
  recommendation: string;
}

export interface TeamStreak {
  id: string;
  team: string;
  streak: string;
  record: string;
  trend: 'hot' | 'cold' | 'neutral';
}

export interface PlayerStreak {
  id: string;
  player: string;
  metric: string;
  last5Avg: number;
  streak: string;
  trend: 'hot' | 'cold' | 'neutral';
  team: string;
}

export interface AIInsightsData {
  topBets: AIBet[];
  teamStreaks: TeamStreak[];
  playerStreaks: PlayerStreak[];
  bestBet: {
    recommendation: string;
    confidence: number;
    reasoning: string;
  };
  lastUpdated: string;
}
