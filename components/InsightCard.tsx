
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { commonStyles, colors } from '../styles/commonStyles';
import Icon from './Icon';
import { Insight } from '../types/analytics';

interface InsightCardProps {
  insight: Insight;
}

export default function InsightCard({ insight }: InsightCardProps) {
  const getTypeIcon = () => {
    switch (insight.type) {
      case 'prediction':
        return 'eye-outline';
      case 'opportunity':
        return 'flash-outline';
      case 'trend':
        return 'trending-up-outline';
      default:
        return 'information-circle-outline';
    }
  };

  const getTypeColor = () => {
    switch (insight.type) {
      case 'prediction':
        return colors.upcoming;
      case 'opportunity':
        return colors.accent;
      case 'trend':
        return colors.warning;
      default:
        return colors.muted;
    }
  };

  const getConfidenceColor = () => {
    if (insight.confidence >= 80) return colors.success;
    if (insight.confidence >= 60) return colors.warning;
    return colors.error;
  };

  return (
    <TouchableOpacity 
      style={commonStyles.card}
      onPress={() => console.log('Insight selected:', insight.id)}
    >
      <View style={[commonStyles.spaceBetween, { marginBottom: 12 }]}>
        <View style={commonStyles.row}>
          <Icon 
            name={getTypeIcon() as any} 
            size={16} 
            color={getTypeColor()} 
          />
          <Text style={[
            commonStyles.textSmall, 
            { 
              marginLeft: 8,
              color: getTypeColor(),
              fontWeight: '600',
              textTransform: 'uppercase'
            }
          ]}>
            {insight.type}
          </Text>
        </View>
        
        <View style={[commonStyles.row, { alignItems: 'center' }]}>
          <View style={{
            width: 6,
            height: 6,
            borderRadius: 3,
            backgroundColor: getConfidenceColor(),
            marginRight: 6
          }} />
          <Text style={[
            commonStyles.textSmall,
            { color: getConfidenceColor(), fontWeight: '600' }
          ]}>
            {insight.confidence}%
          </Text>
        </View>
      </View>

      <Text style={[commonStyles.text, { fontWeight: '600', marginBottom: 8 }]}>
        {insight.title}
      </Text>
      
      <Text style={[commonStyles.textMuted, { marginBottom: 8 }]}>
        {insight.description}
      </Text>
      
      <View style={[commonStyles.spaceBetween, { alignItems: 'center' }]}>
        <Text style={[commonStyles.textSmall, { color: colors.muted }]}>
          {insight.league}
        </Text>
        
        <TouchableOpacity
          style={[commonStyles.row, { alignItems: 'center' }]}
          onPress={() => console.log('View details for insight:', insight.id)}
        >
          <Text style={[commonStyles.textSmall, { color: colors.accent, marginRight: 4 }]}>
            View Details
          </Text>
          <Icon name="chevron-forward-outline" size={12} color={colors.accent} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}
