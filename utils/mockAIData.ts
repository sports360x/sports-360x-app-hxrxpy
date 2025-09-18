
import { AIInsightsData } from '../types/aiInsights';

export const getMockAIInsights = (): AIInsightsData => {
  return {
    lastUpdated: new Date().toISOString(),
    bestBet: {
      recommendation: 'Lakers -3.5 vs Warriors',
      confidence: 0.78,
      reasoning: 'Lakers have covered 7 of last 10 home games. Warriors missing key defender Draymond Green. Lakers\' pace advantage at home creates favorable matchup.',
      league: 'NBA',
      type: 'Spread',
      detailedAnalysis: {
        keyFactors: [
          'Lakers 7-3 ATS at home this season',
          'Warriors 2-8 ATS without Draymond Green',
          'Lakers average 8.2 more possessions at home',
          'Head-to-head: Lakers won last 3 meetings by average of 12 points'
        ],
        riskFactors: [
          'Warriors have won 4 straight road games',
          'Curry shooting 45% from 3 in last 5 games',
          'Lakers on back-to-back games'
        ],
        supportingData: [
          'Lakers defensive rating: 108.2 at home vs 115.6 on road',
          'Warriors offensive rating drops 6.8 points without Green',
          'Weather: Clear, 72°F (indoor venue)'
        ]
      }
    },
    topOpportunities: [
      {
        id: '1',
        league: 'NBA',
        matchup: 'Celtics vs Heat',
        type: 'Over/Under',
        recommendation: 'Over 218.5 points',
        confidence: 0.72,
        reasoning: 'Both teams averaging 115+ points in last 5 games. Fast pace expected with both teams healthy.',
        keyFactors: [
          'Celtics averaging 119.2 PPG in last 5',
          'Heat allowing 112.8 PPG on road',
          'Expected pace: 102.5 possessions'
        ],
        paceAnalysis: {
          expectedPace: 102.5,
          impact: 'Faster pace favors over, both teams prefer uptempo style'
        },
        historicalTrends: [
          {
            description: 'Over hit in 8 of last 10 Celtics home games',
            relevance: 'high'
          },
          {
            description: 'Heat road games average 223.4 total points',
            relevance: 'high'
          }
        ]
      },
      {
        id: '2',
        league: 'NFL',
        matchup: 'Chiefs vs Bills',
        type: 'Player Prop',
        recommendation: 'Josh Allen Over 1.5 Passing TDs',
        confidence: 0.69,
        reasoning: 'Allen has thrown 2+ TDs in 12 of last 15 games. Chiefs secondary ranks 28th vs passing TDs.',
        keyFactors: [
          'Allen: 2.4 passing TDs per game average',
          'Chiefs allow 2.1 passing TDs per game',
          'Bills at home in prime time'
        ],
        playerMatchups: [
          {
            player1: 'Josh Allen',
            player2: 'Chiefs Secondary',
            advantage: 'Allen has mobility edge, Chiefs struggle with dual-threat QBs'
          }
        ],
        weatherImpact: {
          condition: 'Clear, 45°F, 8mph wind',
          impact: 'neutral',
          description: 'Good passing conditions, minimal wind impact'
        },
        historicalTrends: [
          {
            description: 'Allen averages 2.8 TDs vs AFC West teams',
            relevance: 'medium'
          }
        ]
      },
      {
        id: '3',
        league: 'MLB',
        matchup: 'Yankees vs Red Sox',
        type: 'Moneyline',
        recommendation: 'Yankees ML (-140)',
        confidence: 0.65,
        reasoning: 'Cole on mound for Yankees, Red Sox struggling vs elite pitching. Yankees 8-2 in Cole starts vs AL East.',
        keyFactors: [
          'Gerrit Cole: 2.89 ERA vs Red Sox career',
          'Red Sox: .198 BA vs pitchers with 3.00+ ERA',
          'Yankees bullpen rested'
        ],
        weatherImpact: {
          condition: 'Partly cloudy, 68°F, 12mph wind',
          impact: 'positive',
          description: 'Wind blowing out to left field favors Yankees right-handed power'
        },
        historicalTrends: [
          {
            description: 'Yankees 12-4 in day games at Fenway since 2022',
            relevance: 'high'
          }
        ]
      },
      {
        id: '4',
        league: 'SOCCER',
        matchup: 'Manchester City vs Arsenal',
        type: 'Over/Under',
        recommendation: 'Over 2.5 Goals',
        confidence: 0.71,
        reasoning: 'Both teams in excellent attacking form. City averaging 2.8 goals at home, Arsenal 2.1 away.',
        keyFactors: [
          'City: 18 goals in last 6 home matches',
          'Arsenal: 13 goals in last 6 away matches',
          'Both teams to score in 9 of last 10 meetings'
        ],
        injuryImpact: [
          {
            player: 'Rodri',
            team: 'Manchester City',
            impact: 'medium',
            description: 'Defensive midfielder out, could lead to more open game'
          }
        ],
        historicalTrends: [
          {
            description: 'Over 2.5 goals hit in 7 of last 8 City vs Arsenal matches',
            relevance: 'high'
          }
        ]
      },
      {
        id: '5',
        league: 'TENNIS',
        matchup: 'Djokovic vs Alcaraz',
        type: 'Over/Under',
        recommendation: 'Over 3.5 Sets',
        confidence: 0.68,
        reasoning: 'Both players in peak form. Their last 4 meetings went to 4+ sets. Clay court favors longer rallies.',
        keyFactors: [
          'Last 4 H2H matches averaged 4.2 sets',
          'Clay court surface extends rallies',
          'Both players 100% fit'
        ],
        historicalTrends: [
          {
            description: 'Djokovic clay matches go over 3.5 sets 73% of time',
            relevance: 'high'
          },
          {
            description: 'Alcaraz vs top 5 players: 68% go over 3.5 sets',
            relevance: 'high'
          }
        ]
      }
    ],
    teamStreaks: [
      {
        teamId: 'bos',
        teamName: 'Boston Celtics',
        league: 'NBA',
        streakType: 'winning',
        streakLength: 7,
        description: 'Won 7 straight games, averaging 118.4 PPG during streak',
        confidence: 0.82,
        nextGame: {
          opponent: 'Miami Heat',
          date: '2024-01-15',
          isHome: true,
          projectedOutcome: '68% chance to extend streak'
        },
        keyStats: [
          { metric: 'Offensive Rating', value: '121.3', trend: 'up' },
          { metric: 'Defensive Rating', value: '108.7', trend: 'down' },
          { metric: '3P%', value: '39.2%', trend: 'up' }
        ]
      },
      {
        teamId: 'buf',
        teamName: 'Buffalo Bills',
        league: 'NFL',
        streakType: 'ats_winning',
        streakLength: 6,
        description: 'Covered spread in 6 consecutive games, outperforming expectations',
        confidence: 0.75,
        nextGame: {
          opponent: 'Kansas City Chiefs',
          date: '2024-01-14',
          isHome: true,
          projectedOutcome: '58% chance to cover -2.5 spread'
        },
        keyStats: [
          { metric: 'Points Per Game', value: '28.4', trend: 'up' },
          { metric: 'Yards Allowed', value: '312.8', trend: 'down' },
          { metric: 'Turnover Differential', value: '+1.8', trend: 'stable' }
        ]
      },
      {
        teamId: 'nyy',
        teamName: 'New York Yankees',
        league: 'MLB',
        streakType: 'winning',
        streakLength: 8,
        description: 'Won 8 straight games, dominant pitching and timely hitting',
        confidence: 0.79,
        nextGame: {
          opponent: 'Boston Red Sox',
          date: '2024-01-16',
          isHome: false,
          projectedOutcome: '72% chance to extend streak with Cole pitching'
        },
        keyStats: [
          { metric: 'Team ERA', value: '2.89', trend: 'down' },
          { metric: 'Runs Per Game', value: '6.2', trend: 'up' },
          { metric: 'WHIP', value: '1.08', trend: 'down' }
        ]
      },
      {
        teamId: 'mci',
        teamName: 'Manchester City',
        league: 'SOCCER',
        streakType: 'winning',
        streakLength: 5,
        description: 'Won 5 straight Premier League matches, scoring 18 goals',
        confidence: 0.85,
        nextGame: {
          opponent: 'Arsenal',
          date: '2024-01-17',
          isHome: true,
          projectedOutcome: '65% chance to win, 78% chance over 2.5 goals'
        },
        keyStats: [
          { metric: 'Goals Per Game', value: '3.6', trend: 'up' },
          { metric: 'Possession %', value: '68.2%', trend: 'stable' },
          { metric: 'Pass Accuracy', value: '91.4%', trend: 'up' }
        ]
      }
    ],
    playerStreaks: [
      {
        playerId: 'jt0',
        playerName: 'Jayson Tatum',
        team: 'Boston Celtics',
        position: 'SF',
        league: 'NBA',
        streakType: 'hot',
        metric: 'Points',
        currentValue: 31.2,
        streakLength: 8,
        description: 'Averaging 31.2 PPG over last 8 games, shooting 48% from 3',
        confidence: 0.76,
        nextGame: {
          opponent: 'Miami Heat',
          date: '2024-01-15',
          projectedPerformance: '28+ points (72% confidence)'
        },
        recentGames: [
          { date: '2024-01-12', opponent: 'Lakers', value: 35, result: 'over' },
          { date: '2024-01-10', opponent: 'Warriors', value: 28, result: 'over' },
          { date: '2024-01-08', opponent: 'Nets', value: 33, result: 'over' },
          { date: '2024-01-06', opponent: 'Knicks', value: 29, result: 'over' },
          { date: '2024-01-04', opponent: '76ers', value: 32, result: 'over' }
        ]
      },
      {
        playerId: 'ja8',
        playerName: 'Josh Allen',
        team: 'Buffalo Bills',
        position: 'QB',
        league: 'NFL',
        streakType: 'hot',
        metric: 'Passing TDs',
        currentValue: 2.8,
        streakLength: 5,
        description: 'Thrown 2+ TDs in 5 straight games, 14 total TDs',
        confidence: 0.73,
        nextGame: {
          opponent: 'Kansas City Chiefs',
          date: '2024-01-14',
          projectedPerformance: '2+ passing TDs (69% confidence)'
        },
        recentGames: [
          { date: '2024-01-07', opponent: 'Dolphins', value: 3, result: 'over' },
          { date: '2023-12-31', opponent: 'Patriots', value: 2, result: 'hit' },
          { date: '2023-12-24', opponent: 'Chargers', value: 4, result: 'over' },
          { date: '2023-12-17', opponent: 'Cowboys', value: 2, result: 'hit' },
          { date: '2023-12-10', opponent: 'Chiefs', value: 3, result: 'over' }
        ]
      },
      {
        playerId: 'aj99',
        playerName: 'Aaron Judge',
        team: 'New York Yankees',
        position: 'OF',
        league: 'MLB',
        streakType: 'hot',
        metric: 'Home Runs',
        currentValue: 1.2,
        streakLength: 6,
        description: 'Hit 7 HRs in last 6 games, on pace for career year',
        confidence: 0.81,
        nextGame: {
          opponent: 'Boston Red Sox',
          date: '2024-01-16',
          projectedPerformance: '1+ HR (74% confidence)'
        },
        recentGames: [
          { date: '2024-01-13', opponent: 'Orioles', value: 2, result: 'over' },
          { date: '2024-01-12', opponent: 'Orioles', value: 1, result: 'hit' },
          { date: '2024-01-11', opponent: 'Orioles', value: 0, result: 'under' },
          { date: '2024-01-09', opponent: 'Rays', value: 2, result: 'over' },
          { date: '2024-01-08', opponent: 'Rays', value: 1, result: 'hit' }
        ]
      }
    ],
    marketTrends: [
      {
        league: 'NBA',
        trend: 'Overs hitting at 58% rate',
        description: 'Increased pace and improved shooting percentages driving higher-scoring games',
        confidence: 0.67
      },
      {
        league: 'NFL',
        trend: 'Home underdogs covering 62%',
        description: 'Home field advantage more pronounced in cold weather games',
        confidence: 0.71
      },
      {
        league: 'MLB',
        trend: 'Unders in day games 54%',
        description: 'Pitchers performing better in day games, wind patterns favor pitchers',
        confidence: 0.63
      }
    ],
    injuryUpdates: [
      {
        player: 'Kawhi Leonard',
        team: 'LA Clippers',
        league: 'NBA',
        status: 'QUESTIONABLE',
        impact: 'high',
        description: 'Knee soreness, game-time decision for next 3 games',
        bettingImplications: 'Clippers spread moves 4-6 points without Leonard, under becomes more attractive'
      },
      {
        player: 'Christian McCaffrey',
        team: 'San Francisco 49ers',
        league: 'NFL',
        status: 'PROBABLE',
        impact: 'medium',
        description: 'Ankle injury, expected to play but may see reduced workload',
        bettingImplications: 'Rushing yards prop may be lower, Jordan Mason could see increased touches'
      },
      {
        player: 'Ronald Acuña Jr.',
        team: 'Atlanta Braves',
        league: 'MLB',
        status: 'OUT',
        impact: 'high',
        description: 'Knee surgery, out 4-6 weeks',
        bettingImplications: 'Braves team total drops significantly, affects run line and over/under'
      }
    ]
  };
};
