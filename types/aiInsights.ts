
export interface AIOpportunity {
  id: string;
  league: 'NBA' | 'NFL' | 'MLB' | 'SOCCER' | 'TENNIS';
  matchup: string;
  type: 'Spread' | 'Moneyline' | 'Over/Under' | 'Player Prop';
  recommendation: string;
  confidence: number; // 0-1
  reasoning: string;
  keyFactors: string[];
  playerMatchups?: {
    player1: string;
    player2: string;
    advantage: string;
  }[];
  weatherImpact?: {
    condition: string;
    impact: 'positive' | 'negative' | 'neutral';
    description: string;
  };
  paceAnalysis?: {
    expectedPace: number;
    impact: string;
  };
  injuryImpact?: {
    player: string;
    team: string;
    impact: 'high' | 'medium' | 'low';
    description: string;
  }[];
  historicalTrends: {
    description: string;
    relevance: 'high' | 'medium' | 'low';
  }[];
}

export interface TeamStreak {
  teamId: string;
  teamName: string;
  league: 'NBA' | 'NFL' | 'MLB' | 'SOCCER' | 'TENNIS';
  streakType: 'winning' | 'losing' | 'ats_winning' | 'ats_losing';
  streakLength: number;
  description: string;
  confidence: number;
  nextGame?: {
    opponent: string;
    date: string;
    isHome: boolean;
    projectedOutcome: string;
  };
  keyStats: {
    metric: string;
    value: string;
    trend: 'up' | 'down' | 'stable';
  }[];
}

export interface PlayerStreak {
  playerId: string;
  playerName: string;
  team: string;
  position: string;
  league: 'NBA' | 'NFL' | 'MLB' | 'SOCCER' | 'TENNIS';
  streakType: 'hot' | 'cold';
  metric: string;
  currentValue: number;
  streakLength: number;
  description: string;
  confidence: number;
  nextGame?: {
    opponent: string;
    date: string;
    projectedPerformance: string;
  };
  recentGames: {
    date: string;
    opponent: string;
    value: number;
    result: 'over' | 'under' | 'hit';
  }[];
}

export interface BestBet {
  recommendation: string;
  confidence: number;
  reasoning: string;
  league: 'NBA' | 'NFL' | 'MLB' | 'SOCCER' | 'TENNIS';
  type: 'Spread' | 'Moneyline' | 'Over/Under' | 'Player Prop';
  detailedAnalysis: {
    keyFactors: string[];
    riskFactors: string[];
    supportingData: string[];
  };
}

export interface AIInsightsData {
  lastUpdated: string;
  bestBet: BestBet;
  topOpportunities: AIOpportunity[];
  teamStreaks: TeamStreak[];
  playerStreaks: PlayerStreak[];
  marketTrends: {
    league: 'NBA' | 'NFL' | 'MLB' | 'SOCCER' | 'TENNIS';
    trend: string;
    description: string;
    confidence: number;
  }[];
  injuryUpdates: {
    player: string;
    team: string;
    league: 'NBA' | 'NFL' | 'MLB' | 'SOCCER' | 'TENNIS';
    status: 'OUT' | 'QUESTIONABLE' | 'DOUBTFUL' | 'PROBABLE';
    impact: 'high' | 'medium' | 'low';
    description: string;
    bettingImplications: string;
  }[];
}
