
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { commonStyles, colors } from '../styles/commonStyles';
import Icon from './Icon';
import ConfidenceMeter from './ConfidenceMeter';
import { AIInsightsData } from '../types/aiInsights';

interface InsightsPanelProps {
  insights: AIInsightsData;
  selectedCategory: 'opportunities' | 'streaks' | 'players';
}

export default function InsightsPanel({ insights, selectedCategory }: InsightsPanelProps) {
  // Add null checks to prevent crashes
  if (!insights) {
    return (
      <View style={commonStyles.section}>
        <Text style={[commonStyles.textMuted, { textAlign: 'center' }]}>
          Loading insights...
        </Text>
      </View>
    );
  }

  const renderOpportunities = () => {
    // Use topOpportunities instead of topBets and add null check
    const opportunities = insights.topOpportunities || [];
    
    return (
      <View style={commonStyles.section}>
        <Text style={[commonStyles.subtitle, { marginBottom: 16 }]}>
          Top Opportunities Today
        </Text>
        {opportunities.length === 0 ? (
          <View style={commonStyles.card}>
            <Text style={[commonStyles.textMuted, { textAlign: 'center' }]}>
              No opportunities available at the moment
            </Text>
          </View>
        ) : (
          opportunities.slice(0, 5).map((bet, index) => (
            <View key={bet.id} style={[commonStyles.card, { marginBottom: 12 }]}>
              <View style={[commonStyles.spaceBetween, { marginBottom: 12 }]}>
                <View style={[commonStyles.row, { alignItems: 'center' }]}>
                  <View style={{
                    backgroundColor: colors.secondary,
                    paddingHorizontal: 8,
                    paddingVertical: 4,
                    borderRadius: 12,
                    marginRight: 8,
                  }}>
                    <Text style={[commonStyles.textSmall, { color: colors.accent }]}>
                      {bet.league}
                    </Text>
                  </View>
                  <Text style={[commonStyles.textSmall, { color: colors.muted }]}>
                    #{index + 1}
                  </Text>
                </View>
                <Text style={[commonStyles.textSmall, { color: colors.muted }]}>
                  {bet.type}
                </Text>
              </View>

              <Text style={[commonStyles.text, { fontWeight: '600', marginBottom: 8 }]}>
                {bet.matchup}
              </Text>
              
              <Text style={[commonStyles.textMuted, { marginBottom: 12 }]}>
                {bet.recommendation}
              </Text>

              <ConfidenceMeter confidence={Math.round(bet.confidence * 100)} />

              <View style={[commonStyles.spaceBetween, { marginTop: 12, alignItems: 'center' }]}>
                <Text style={[commonStyles.textSmall, { color: colors.muted }]}>
                  {bet.reasoning}
                </Text>
                <TouchableOpacity
                  style={[commonStyles.row, { alignItems: 'center' }]}
                  onPress={() => console.log('Track this bet:', bet.id)}
                >
                  <Text style={[commonStyles.textSmall, { color: colors.accent, marginRight: 4 }]}>
                    Track This Bet
                  </Text>
                  <Icon name="add-circle-outline" size={16} color={colors.accent} />
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </View>
    );
  };

  const renderTeamStreaks = () => {
    // Add null check and proper data structure
    const teamStreaks = insights.teamStreaks || [];
    
    return (
      <View style={commonStyles.section}>
        <Text style={[commonStyles.subtitle, { marginBottom: 16 }]}>
          Team Streaks & Trends
        </Text>
        {teamStreaks.length === 0 ? (
          <View style={commonStyles.card}>
            <Text style={[commonStyles.textMuted, { textAlign: 'center' }]}>
              No team streaks available
            </Text>
          </View>
        ) : (
          teamStreaks.map((streak) => (
            <View key={streak.teamId} style={[commonStyles.card, { marginBottom: 12 }]}>
              <View style={[commonStyles.spaceBetween, { marginBottom: 8 }]}>
                <Text style={[commonStyles.text, { fontWeight: '600' }]}>
                  {streak.teamName}
                </Text>
                <View style={[commonStyles.row, { alignItems: 'center' }]}>
                  <View style={{
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: streak.streakType.includes('winning') ? colors.success : 
                                   streak.streakType.includes('losing') ? colors.error : colors.muted,
                    marginRight: 6,
                  }} />
                  <Text style={[
                    commonStyles.textSmall,
                    { 
                      color: streak.streakType.includes('winning') ? colors.success : 
                             streak.streakType.includes('losing') ? colors.error : colors.muted,
                      fontWeight: '600',
                      textTransform: 'uppercase'
                    }
                  ]}>
                    {streak.streakType.replace('_', ' ')}
                  </Text>
                </View>
              </View>
              
              <Text style={[commonStyles.textMuted, { marginBottom: 8 }]}>
                {streak.description}
              </Text>
              
              <Text style={[commonStyles.textSmall, { color: colors.muted }]}>
                Streak: {streak.streakLength} games
              </Text>

              {streak.nextGame && (
                <View style={{ marginTop: 8, paddingTop: 8, borderTopWidth: 1, borderTopColor: colors.border }}>
                  <Text style={[commonStyles.textSmall, { color: colors.accent }]}>
                    Next: vs {streak.nextGame.opponent} ({streak.nextGame.isHome ? 'Home' : 'Away'})
                  </Text>
                  <Text style={[commonStyles.textSmall, { color: colors.muted }]}>
                    {streak.nextGame.projectedOutcome}
                  </Text>
                </View>
              )}
            </View>
          ))
        )}
      </View>
    );
  };

  const renderPlayerStreaks = () => {
    // Add null check and proper data structure
    const playerStreaks = insights.playerStreaks || [];
    
    return (
      <View style={commonStyles.section}>
        <Text style={[commonStyles.subtitle, { marginBottom: 16 }]}>
          Player Performance Streaks
        </Text>
        {playerStreaks.length === 0 ? (
          <View style={commonStyles.card}>
            <Text style={[commonStyles.textMuted, { textAlign: 'center' }]}>
              No player streaks available
            </Text>
          </View>
        ) : (
          playerStreaks.map((player) => (
            <View key={player.playerId} style={[commonStyles.card, { marginBottom: 12 }]}>
              <View style={[commonStyles.spaceBetween, { marginBottom: 8 }]}>
                <View>
                  <Text style={[commonStyles.text, { fontWeight: '600' }]}>
                    {player.playerName}
                  </Text>
                  <Text style={[commonStyles.textSmall, { color: colors.muted }]}>
                    {player.team} - {player.position}
                  </Text>
                </View>
                <View style={[commonStyles.row, { alignItems: 'center' }]}>
                  <View style={{
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: player.streakType === 'hot' ? colors.success : 
                                   player.streakType === 'cold' ? colors.error : colors.muted,
                    marginRight: 6,
                  }} />
                  <Text style={[
                    commonStyles.textSmall,
                    { 
                      color: player.streakType === 'hot' ? colors.success : 
                             player.streakType === 'cold' ? colors.error : colors.muted,
                      fontWeight: '600',
                      textTransform: 'uppercase'
                    }
                  ]}>
                    {player.streakType}
                  </Text>
                </View>
              </View>
              
              <View style={[commonStyles.spaceBetween, { marginBottom: 8 }]}>
                <Text style={commonStyles.text}>
                  {player.metric}: {player.currentValue}
                </Text>
                <Text style={[commonStyles.textSmall, { color: colors.accent }]}>
                  Last {player.streakLength} avg
                </Text>
              </View>
              
              <Text style={[commonStyles.textMuted, { marginBottom: 8 }]}>
                {player.description}
              </Text>

              {player.nextGame && (
                <View style={{ paddingTop: 8, borderTopWidth: 1, borderTopColor: colors.border }}>
                  <Text style={[commonStyles.textSmall, { color: colors.accent }]}>
                    Next: vs {player.nextGame.opponent}
                  </Text>
                  <Text style={[commonStyles.textSmall, { color: colors.muted }]}>
                    {player.nextGame.projectedPerformance}
                  </Text>
                </View>
              )}
            </View>
          ))
        )}
      </View>
    );
  };

  switch (selectedCategory) {
    case 'opportunities':
      return renderOpportunities();
    case 'streaks':
      return renderTeamStreaks();
    case 'players':
      return renderPlayerStreaks();
    default:
      return renderOpportunities();
  }
}
