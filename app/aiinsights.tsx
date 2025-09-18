
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown, FadeInUp, SlideInRight } from 'react-native-reanimated';
import { commonStyles, colors } from '../styles/commonStyles';
import Icon from '../components/Icon';
import InsightsPanel from '../components/InsightsPanel';
import ConfidenceMeter from '../components/ConfidenceMeter';
import { getMockAIInsights } from '../utils/mockAIData';
import { AIInsightsData } from '../types/aiInsights';

export default function AIInsightsScreen() {
  const [insights, setInsights] = useState<AIInsightsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<'opportunities' | 'streaks' | 'players'>('opportunities');

  const loadInsights = useCallback(async (showLoading = true) => {
    try {
      if (showLoading) setLoading(true);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      const data = getMockAIInsights();
      setInsights(data);
      console.log('AI Insights loaded');
    } catch (error) {
      console.log('Error loading AI insights:', error);
    } finally {
      if (showLoading) setLoading(false);
      setRefreshing(false);
    }
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadInsights(false);
  }, [loadInsights]);

  useEffect(() => {
    loadInsights();
  }, [loadInsights]);

  if (loading) {
    return (
      <SafeAreaView style={commonStyles.safeArea}>
        <View style={commonStyles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.accent} />
          <Text style={commonStyles.loadingText}>Analyzing sports data...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={commonStyles.safeArea}>
      <View style={commonStyles.container}>
        <Animated.View 
          style={{ padding: 16 }}
          entering={FadeInUp.duration(600)}
        >
          <Text style={commonStyles.title}>Sports 360 X Insights</Text>
          <Text style={commonStyles.textMuted}>AI-powered analytics and predictions</Text>
        </Animated.View>

        <ScrollView 
          style={commonStyles.content}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={colors.accent}
              title="Pull to refresh insights"
              titleColor={colors.text}
            />
          }
        >
          {/* Best Bet of the Day */}
          {insights?.bestBet && (
            <Animated.View 
              style={commonStyles.section}
              entering={FadeInDown.duration(400).delay(100)}
            >
              <View style={[commonStyles.row, { marginBottom: 16 }]}>
                <Animated.View entering={SlideInRight.duration(300)}>
                  <Icon name="star-outline" size={20} color={colors.accent} />
                </Animated.View>
                <Text style={[commonStyles.subtitle, { marginLeft: 8 }]}>Best Bet Today</Text>
              </View>
              
              <View style={[commonStyles.card, { borderLeftWidth: 4, borderLeftColor: colors.accent }]}>
                <Text style={[commonStyles.text, { fontWeight: '600', marginBottom: 8 }]}>
                  {insights.bestBet.recommendation}
                </Text>
                
                <ConfidenceMeter confidence={insights.bestBet.confidence} />
                
                <Text style={[commonStyles.textMuted, { marginTop: 12, marginBottom: 16 }]}>
                  {insights.bestBet.reasoning}
                </Text>

                {/* Key Factors */}
                <View style={{ marginBottom: 12 }}>
                  <Text style={[commonStyles.textSmall, { fontWeight: '600', marginBottom: 8, color: colors.success }]}>
                    Key Factors:
                  </Text>
                  {insights.bestBet.detailedAnalysis.keyFactors.map((factor, index) => (
                    <View key={index} style={[commonStyles.row, { marginBottom: 4 }]}>
                      <Icon name="checkmark-outline" size={12} color={colors.success} />
                      <Text style={[commonStyles.textSmall, { marginLeft: 6, flex: 1 }]}>
                        {factor}
                      </Text>
                    </View>
                  ))}
                </View>

                {/* Risk Factors */}
                <View style={{ marginBottom: 16 }}>
                  <Text style={[commonStyles.textSmall, { fontWeight: '600', marginBottom: 8, color: colors.warning }]}>
                    Risk Factors:
                  </Text>
                  {insights.bestBet.detailedAnalysis.riskFactors.map((risk, index) => (
                    <View key={index} style={[commonStyles.row, { marginBottom: 4 }]}>
                      <Icon name="warning-outline" size={12} color={colors.warning} />
                      <Text style={[commonStyles.textSmall, { marginLeft: 6, flex: 1 }]}>
                        {risk}
                      </Text>
                    </View>
                  ))}
                </View>
                
                <TouchableOpacity
                  style={[commonStyles.row, { alignItems: 'center' }]}
                  onPress={() => console.log('See detailed rationale for best bet')}
                >
                  <Text style={[commonStyles.textSmall, { color: colors.accent, marginRight: 4 }]}>
                    See Detailed Analysis
                  </Text>
                  <Icon name="chevron-forward-outline" size={12} color={colors.accent} />
                </TouchableOpacity>
              </View>
            </Animated.View>
          )}

          {/* Injury Updates */}
          {insights?.injuryUpdates && insights.injuryUpdates.length > 0 && (
            <Animated.View 
              style={commonStyles.section}
              entering={FadeInDown.duration(400).delay(200)}
            >
              <View style={[commonStyles.row, { marginBottom: 16 }]}>
                <Icon name="medical-outline" size={20} color={colors.error} />
                <Text style={[commonStyles.subtitle, { marginLeft: 8 }]}>Injury Updates</Text>
              </View>
              
              {insights.injuryUpdates.slice(0, 3).map((injury, index) => (
                <Animated.View
                  key={index}
                  style={[
                    commonStyles.card,
                    { 
                      marginBottom: 12,
                      borderLeftWidth: 4,
                      borderLeftColor: injury.impact === 'high' ? colors.error : 
                                      injury.impact === 'medium' ? colors.warning : colors.muted
                    }
                  ]}
                  entering={FadeInDown.duration(400).delay(300 + index * 100)}
                >
                  <View style={[commonStyles.spaceBetween, { marginBottom: 8 }]}>
                    <Text style={[commonStyles.text, { fontWeight: '600' }]}>
                      {injury.player} - {injury.team}
                    </Text>
                    <View style={[
                      {
                        paddingHorizontal: 8,
                        paddingVertical: 2,
                        borderRadius: 12,
                        backgroundColor: injury.status === 'OUT' ? colors.error :
                                        injury.status === 'QUESTIONABLE' ? colors.warning :
                                        injury.status === 'DOUBTFUL' ? colors.error :
                                        colors.success,
                      }
                    ]}>
                      <Text style={[
                        commonStyles.textSmall,
                        { 
                          color: colors.background,
                          fontWeight: '600'
                        }
                      ]}>
                        {injury.status}
                      </Text>
                    </View>
                  </View>
                  <Text style={[commonStyles.textMuted, { marginBottom: 8 }]}>
                    {injury.description}
                  </Text>
                  <Text style={[commonStyles.textSmall, { color: colors.accent, fontStyle: 'italic' }]}>
                    Betting Impact: {injury.bettingImplications}
                  </Text>
                </Animated.View>
              ))}
            </Animated.View>
          )}

          {/* Category Selector */}
          <Animated.View 
            style={commonStyles.section}
            entering={FadeInDown.duration(400).delay(300)}
          >
            <View style={[commonStyles.row, { marginBottom: 16 }]}>
              {[
                { key: 'opportunities', label: 'Top Opportunities', icon: 'flash-outline' },
                { key: 'streaks', label: 'Team Streaks', icon: 'trending-up-outline' },
                { key: 'players', label: 'Player Streaks', icon: 'person-outline' }
              ].map((category, index) => (
                <Animated.View
                  key={category.key}
                  style={{ flex: 1, marginHorizontal: 4 }}
                  entering={FadeInDown.duration(400).delay(400 + index * 100)}
                >
                  <TouchableOpacity
                    style={[
                      {
                        paddingVertical: 12,
                        paddingHorizontal: 8,
                        borderRadius: 8,
                        backgroundColor: selectedCategory === category.key ? colors.accent : colors.card,
                      },
                      commonStyles.center
                    ]}
                    onPress={() => setSelectedCategory(category.key as any)}
                  >
                    <Icon 
                      name={category.icon as any} 
                      size={16} 
                      color={selectedCategory === category.key ? colors.background : colors.text} 
                    />
                    <Text style={[
                      commonStyles.textSmall,
                      { 
                        color: selectedCategory === category.key ? colors.background : colors.text,
                        marginTop: 4,
                        textAlign: 'center',
                        fontWeight: selectedCategory === category.key ? '700' : '600'
                      }
                    ]}>
                      {category.label}
                    </Text>
                  </TouchableOpacity>
                </Animated.View>
              ))}
            </View>
          </Animated.View>

          {/* Content based on selected category */}
          {insights && (
            <Animated.View
              key={selectedCategory} // Force re-render with animation
              entering={FadeInDown.duration(400)}
            >
              <InsightsPanel
                insights={insights}
                selectedCategory={selectedCategory}
              />
            </Animated.View>
          )}

          {/* Market Trends */}
          {insights?.marketTrends && insights.marketTrends.length > 0 && (
            <Animated.View 
              style={commonStyles.section}
              entering={FadeInDown.duration(400).delay(500)}
            >
              <View style={[commonStyles.row, { marginBottom: 16 }]}>
                <Icon name="analytics-outline" size={20} color={colors.confidence} />
                <Text style={[commonStyles.subtitle, { marginLeft: 8 }]}>Market Trends</Text>
              </View>
              
              {insights.marketTrends.map((trend, index) => (
                <Animated.View
                  key={index}
                  style={[
                    commonStyles.card,
                    { 
                      marginBottom: 12,
                      borderLeftWidth: 4,
                      borderLeftColor: colors.confidence
                    }
                  ]}
                  entering={FadeInDown.duration(400).delay(600 + index * 100)}
                >
                  <View style={[commonStyles.spaceBetween, { marginBottom: 8 }]}>
                    <Text style={[commonStyles.text, { fontWeight: '600' }]}>
                      {trend.league}: {trend.trend}
                    </Text>
                    <Text style={[
                      commonStyles.textSmall,
                      { 
                        color: colors.confidence,
                        fontWeight: '600'
                      }
                    ]}>
                      {Math.round(trend.confidence * 100)}% confidence
                    </Text>
                  </View>
                  <Text style={[commonStyles.textMuted]}>
                    {trend.description}
                  </Text>
                </Animated.View>
              ))}
            </Animated.View>
          )}

          {/* Last Updated */}
          <Animated.View 
            style={[commonStyles.section, { alignItems: 'center' }]}
            entering={FadeInDown.duration(400).delay(700)}
          >
            <Text style={[commonStyles.textSmall, { color: colors.muted }]}>
              Last updated: {new Date(insights?.lastUpdated || '').toLocaleTimeString()}
            </Text>
            <TouchableOpacity
              style={[
                {
                  backgroundColor: colors.card,
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                  borderRadius: 20,
                  marginTop: 8,
                },
                commonStyles.row
              ]}
              onPress={() => loadInsights()}
            >
              <Icon name="refresh-outline" size={16} color={colors.accent} />
              <Text style={[commonStyles.textSmall, { marginLeft: 4, color: colors.accent }]}>
                Refresh Insights
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
