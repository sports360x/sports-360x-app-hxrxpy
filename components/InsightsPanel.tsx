
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
  const renderOpportunities = () => (
    <View style={commonStyles.section}>
      <Text style={[commonStyles.subtitle, { marginBottom: 16 }]}>
        Top Opportunities Today
      </Text>
      {insights.topBets.map((bet, index) => (
        <View key={bet.id} style={commonStyles.card}>
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
              {bet.odds}
            </Text>
          </View>

          <Text style={[commonStyles.text, { fontWeight: '600', marginBottom: 8 }]}>
            {bet.matchup}
          </Text>
          
          <Text style={[commonStyles.textMuted, { marginBottom: 12 }]}>
            {bet.recommendation}
          </Text>

          <ConfidenceMeter confidence={Math.round(bet.aiConfidence * 100)} />

          <View style={[commonStyles.spaceBetween, { marginTop: 12, alignItems: 'center' }]}>
            <Text style={[commonStyles.textSmall, { color: colors.muted }]}>
              {bet.streakInfo}
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
      ))}
    </View>
  );

  const renderTeamStreaks = () => (
    <View style={commonStyles.section}>
      <Text style={[commonStyles.subtitle, { marginBottom: 16 }]}>
        Team Streaks & Trends
      </Text>
      {insights.teamStreaks.map((streak) => (
        <View key={streak.id} style={commonStyles.card}>
          <View style={[commonStyles.spaceBetween, { marginBottom: 8 }]}>
            <Text style={[commonStyles.text, { fontWeight: '600' }]}>
              {streak.team}
            </Text>
            <View style={[commonStyles.row, { alignItems: 'center' }]}>
              <View style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: streak.trend === 'hot' ? colors.success : 
                               streak.trend === 'cold' ? colors.error : colors.muted,
                marginRight: 6,
              }} />
              <Text style={[
                commonStyles.textSmall,
                { 
                  color: streak.trend === 'hot' ? colors.success : 
                         streak.trend === 'cold' ? colors.error : colors.muted,
                  fontWeight: '600',
                  textTransform: 'uppercase'
                }
              ]}>
                {streak.trend}
              </Text>
            </View>
          </View>
          
          <Text style={[commonStyles.textMuted, { marginBottom: 4 }]}>
            {streak.streak}
          </Text>
          
          <Text style={[commonStyles.textSmall, { color: colors.muted }]}>
            Record: {streak.record}
          </Text>
        </View>
      ))}
    </View>
  );

  const renderPlayerStreaks = () => (
    <View style={commonStyles.section}>
      <Text style={[commonStyles.subtitle, { marginBottom: 16 }]}>
        Player Performance Streaks
      </Text>
      {insights.playerStreaks.map((player) => (
        <View key={player.id} style={commonStyles.card}>
          <View style={[commonStyles.spaceBetween, { marginBottom: 8 }]}>
            <View>
              <Text style={[commonStyles.text, { fontWeight: '600' }]}>
                {player.player}
              </Text>
              <Text style={[commonStyles.textSmall, { color: colors.muted }]}>
                {player.team}
              </Text>
            </View>
            <View style={[commonStyles.row, { alignItems: 'center' }]}>
              <View style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: player.trend === 'hot' ? colors.success : 
                               player.trend === 'cold' ? colors.error : colors.muted,
                marginRight: 6,
              }} />
              <Text style={[
                commonStyles.textSmall,
                { 
                  color: player.trend === 'hot' ? colors.success : 
                         player.trend === 'cold' ? colors.error : colors.muted,
                  fontWeight: '600',
                  textTransform: 'uppercase'
                }
              ]}>
                {player.trend}
              </Text>
            </View>
          </View>
          
          <View style={[commonStyles.spaceBetween, { marginBottom: 8 }]}>
            <Text style={commonStyles.text}>
              {player.metric}: {player.last5Avg}
            </Text>
            <Text style={[commonStyles.textSmall, { color: colors.accent }]}>
              Last 5 avg
            </Text>
          </View>
          
          <Text style={[commonStyles.textMuted]}>
            {player.streak}
          </Text>
        </View>
      ))}
    </View>
  );

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
