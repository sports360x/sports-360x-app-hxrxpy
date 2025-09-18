
import React from 'react';
import { View, Text } from 'react-native';
import { commonStyles, colors } from '../styles/commonStyles';

interface ConfidenceMeterProps {
  confidence: number; // 0-100
  showLabel?: boolean;
}

export default function ConfidenceMeter({ confidence, showLabel = true }: ConfidenceMeterProps) {
  const getConfidenceColor = () => {
    if (confidence >= 80) return colors.success;
    if (confidence >= 60) return colors.warning;
    if (confidence >= 40) return colors.upcoming;
    return colors.error;
  };

  const getConfidenceText = () => {
    if (confidence >= 80) return 'Very High';
    if (confidence >= 60) return 'High';
    if (confidence >= 40) return 'Medium';
    return 'Low';
  };

  return (
    <View>
      {showLabel && (
        <View style={[commonStyles.spaceBetween, { marginBottom: 8 }]}>
          <Text style={[commonStyles.textSmall, { color: colors.muted }]}>
            AI Confidence
          </Text>
          <Text style={[
            commonStyles.textSmall, 
            { 
              color: getConfidenceColor(),
              fontWeight: '600'
            }
          ]}>
            {confidence}% • {getConfidenceText()}
          </Text>
        </View>
      )}
      
      <View style={{
        height: 8,
        backgroundColor: colors.secondary,
        borderRadius: 4,
        overflow: 'hidden',
      }}>
        <View style={{
          height: '100%',
          width: `${confidence}%`,
          backgroundColor: getConfidenceColor(),
          borderRadius: 4,
        }} />
      </View>
    </View>
  );
}
