
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { commonStyles, colors } from '../styles/commonStyles';
import Icon from '../components/Icon';
import StatsCard from '../components/StatsCard';
import InsightCard from '../components/InsightCard';
import { AnalyticsData } from '../types/analytics';
import { fetchAnalytics } from '../utils/api';
import { router } from 'expo-router';

export default function AnalyticsScreen() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedLeague, setSelectedLeague] = useState<'ALL' | 'MLB' | 'NBA' | 'NFL'>('ALL');

  const loadAnalytics = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchAnalytics(selectedLeague);
      setAnalytics(data);
      console.log('Analytics loaded');
    } catch (error) {
      console.log('Error loading analytics:', error);
    } finally {
      setLoading(false);
    }
  }, [selectedLeague]);

  useEffect(() => {
    loadAnalytics();
  }, [loadAnalytics]);

  if (loading) {
    return (
      <SafeAreaView style={commonStyles.safeArea}>
        <View style={commonStyles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.accent} />
          <Text style={commonStyles.loadingText}>Loading analytics...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={commonStyles.safeArea}>
      <View style={commonStyles.container}>
        <View style={{ padding: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View>
            <Text style={commonStyles.title}>Analytics</Text>
            <Text style={commonStyles.textMuted}>AI-powered insights and statistics</Text>
          </View>
          <TouchableOpacity 
            onPress={() => router.push('/debug')}
            style={{ padding: 8 }}
          >
            <Icon name="bug-outline" size={24} color={colors.muted} />
          </TouchableOpacity>
        </View>

        <ScrollView style={commonStyles.content}>
          {/* AI Daily Insights */}
          <View style={commonStyles.section}>
            <View style={[commonStyles.row, { marginBottom: 16 }]}>
              <Icon name="bulb-outline" size={20} color={colors.accent} />
              <Text style={[commonStyles.subtitle, { marginLeft: 8 }]}>AI Daily Insights</Text>
            </View>
            
            {analytics?.insights.map((insight, index) => (
              <InsightCard key={index} insight={insight} />
            ))}
          </View>

          {/* Performance Stats */}
          <View style={commonStyles.section}>
            <Text style={commonStyles.subtitle}>Performance Overview</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 12 }}>
              <StatsCard
                title="Win Rate"
                value={analytics?.performance.winRate || '0%'}
                trend={analytics?.performance.winRateTrend || 0}
                icon="trending-up-outline"
              />
              <StatsCard
                title="ROI"
                value={analytics?.performance.roi || '0%'}
                trend={analytics?.performance.roiTrend || 0}
                icon="cash-outline"
              />
              <StatsCard
                title="Hot Streak"
                value={analytics?.performance.hotStreak?.toString() || '0'}
                trend={0}
                icon="flame-outline"
              />
              <StatsCard
                title="Community Rank"
                value={`#${analytics?.performance.communityRank || 'N/A'}`}
                trend={analytics?.performance.rankTrend || 0}
                icon="trophy-outline"
              />
            </View>
          </View>

          {/* League Filters */}
          <View style={commonStyles.section}>
            <Text style={commonStyles.subtitle}>Advanced Stats</Text>
            <View style={[commonStyles.row, { marginTop: 12, marginBottom: 16 }]}>
              {['ALL', 'MLB', 'NBA', 'NFL'].map((league) => (
                <TouchableOpacity
                  key={league}
                  style={[
                    {
                      paddingHorizontal: 16,
                      paddingVertical: 8,
                      borderRadius: 20,
                      marginRight: 8,
                      backgroundColor: selectedLeague === league ? colors.accent : colors.card,
                    }
                  ]}
                  onPress={() => setSelectedLeague(league as any)}
                >
                  <Text style={[
                    commonStyles.textSmall,
                    { color: selectedLeague === league ? colors.background : colors.text }
                  ]}>
                    {league}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Advanced Stats Cards */}
            {selectedLeague === 'MLB' && (
              <View>
                <StatsCard
                  title="xFIP Leaders"
                  value="3.12 ERA"
                  subtitle="Top pitchers by expected performance"
                  icon="baseball-outline"
                />
                <StatsCard
                  title="wOBA Leaders"
                  value=".385 AVG"
                  subtitle="Weighted on-base average leaders"
                  icon="stats-chart-outline"
                />
              </View>
            )}

            {selectedLeague === 'NBA' && (
              <View>
                <StatsCard
                  title="Efficiency Rating"
                  value="118.5 ORtg"
                  subtitle="Offensive rating leaders"
                  icon="basketball-outline"
                />
                <StatsCard
                  title="Plus/Minus"
                  value="+12.4"
                  subtitle="On/off court impact"
                  icon="trending-up-outline"
                />
              </View>
            )}

            {selectedLeague === 'NFL' && (
              <View>
                <StatsCard
                  title="EPA/Play"
                  value="0.24"
                  subtitle="Expected points added per play"
                  icon="football-outline"
                />
                <StatsCard
                  title="QB Rating"
                  value="108.2"
                  subtitle="Quarterback efficiency rating"
                  icon="person-outline"
                />
              </View>
            )}

            {selectedLeague === 'ALL' && (
              <View>
                <StatsCard
                  title="Top Performers"
                  value="Mixed Stats"
                  subtitle="Cross-league performance metrics"
                  icon="podium-outline"
                />
              </View>
            )}
          </View>

          {/* Trending Topics */}
          <View style={commonStyles.section}>
            <Text style={commonStyles.subtitle}>Trending Analysis</Text>
            <View style={commonStyles.card}>
              <View style={[commonStyles.row, { marginBottom: 8 }]}>
                <Icon name="trending-up-outline" size={16} color={colors.success} />
                <Text style={[commonStyles.text, { marginLeft: 8 }]}>Hot Teams This Week</Text>
              </View>
              <Text style={commonStyles.textMuted}>
                Teams showing exceptional performance metrics and momentum
              </Text>
            </View>
            
            <View style={commonStyles.card}>
              <View style={[commonStyles.row, { marginBottom: 8 }]}>
                <Icon name="analytics-outline" size={16} color={colors.accent} />
                <Text style={[commonStyles.text, { marginLeft: 8 }]}>Statistical Anomalies</Text>
              </View>
              <Text style={commonStyles.textMuted}>
                Unusual patterns and outliers in recent game data
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
