
export interface Insight {
  id: string;
  title: string;
  description: string;
  confidence: number;
  type: 'prediction' | 'opportunity' | 'trend';
  league: string;
}

export interface PerformanceStats {
  winRate: string;
  winRateTrend: number;
  roi: string;
  roiTrend: number;
  hotStreak: number;
  communityRank: number;
  rankTrend: number;
}

export interface AnalyticsData {
  insights: Insight[];
  performance: PerformanceStats;
}
