
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { commonStyles, colors } from '../styles/commonStyles';
import Icon from '../components/Icon';
import InsightsPanel from '../components/InsightsPanel';
import ConfidenceMeter from '../components/ConfidenceMeter';
import { getMockAIInsights } from '../utils/mockAIData';
import { AIInsightsData } from '../types/aiInsights';

export default function AIInsightsScreen() {
  const [insights, setInsights] = useState<AIInsightsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<'opportunities' | 'streaks' | 'players'>('opportunities');

  const loadInsights = useCallback(async () => {
    try {
      setLoading(true);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      const data = getMockAIInsights();
      setInsights(data);
      console.log('AI Insights loaded');
    } catch (error) {
      console.log('Error loading AI insights:', error);
    } finally {
      setLoading(false);
    }
  }, []);

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
        <View style={{ padding: 16 }}>
          <Text style={commonStyles.title}>Sports 360 X Insights</Text>
          <Text style={commonStyles.textMuted}>AI-powered analytics and predictions</Text>
        </View>

        <ScrollView style={commonStyles.content}>
          {/* Best Bet of the Day */}
          {insights?.bestBet && (
            <View style={commonStyles.section}>
              <View style={[commonStyles.row, { marginBottom: 16 }]}>
                <Icon name="star-outline" size={20} color={colors.accent} />
                <Text style={[commonStyles.subtitle, { marginLeft: 8 }]}>Best Bet Today</Text>
              </View>
              
              <View style={[commonStyles.card, { borderLeftWidth: 4, borderLeftColor: colors.accent }]}>
                <Text style={[commonStyles.text, { fontWeight: '600', marginBottom: 8 }]}>
                  {insights.bestBet.recommendation}
                </Text>
                
                <ConfidenceMeter confidence={insights.bestBet.confidence} />
                
                <Text style={[commonStyles.textMuted, { marginTop: 12 }]}>
                  {insights.bestBet.reasoning}
                </Text>
                
                <TouchableOpacity
                  style={[commonStyles.row, { marginTop: 12, alignItems: 'center' }]}
                  onPress={() => console.log('See rationale for best bet')}
                >
                  <Text style={[commonStyles.textSmall, { color: colors.accent, marginRight: 4 }]}>
                    See Rationale
                  </Text>
                  <Icon name="chevron-forward-outline" size={12} color={colors.accent} />
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* Category Selector */}
          <View style={commonStyles.section}>
            <View style={[commonStyles.row, { marginBottom: 16 }]}>
              {[
                { key: 'opportunities', label: 'Top Opportunities', icon: 'flash-outline' },
                { key: 'streaks', label: 'Team Streaks', icon: 'trending-up-outline' },
                { key: 'players', label: 'Player Streaks', icon: 'person-outline' }
              ].map((category) => (
                <TouchableOpacity
                  key={category.key}
                  style={[
                    {
                      flex: 1,
                      paddingVertical: 12,
                      paddingHorizontal: 8,
                      borderRadius: 8,
                      backgroundColor: selectedCategory === category.key ? colors.accent : colors.card,
                      marginHorizontal: 4,
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
                      textAlign: 'center'
                    }
                  ]}>
                    {category.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Content based on selected category */}
          {insights && (
            <InsightsPanel
              insights={insights}
              selectedCategory={selectedCategory}
            />
          )}

          {/* Last Updated */}
          <View style={[commonStyles.section, { alignItems: 'center' }]}>
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
              onPress={loadInsights}
            >
              <Icon name="refresh-outline" size={16} color={colors.accent} />
              <Text style={[commonStyles.textSmall, { marginLeft: 4, color: colors.accent }]}>
                Refresh Insights
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
