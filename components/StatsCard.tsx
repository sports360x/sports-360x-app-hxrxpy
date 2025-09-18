
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { commonStyles, colors } from '../styles/commonStyles';
import Icon from './Icon';

interface StatsCardProps {
  title: string;
  value: string;
  trend?: number;
  subtitle?: string;
  icon?: string;
}

export default function StatsCard({ title, value, trend, subtitle, icon }: StatsCardProps) {
  const getTrendColor = () => {
    if (trend === undefined || trend === 0) return colors.muted;
    return trend > 0 ? colors.success : colors.error;
  };

  const getTrendIcon = () => {
    if (trend === undefined || trend === 0) return null;
    return trend > 0 ? 'trending-up-outline' : 'trending-down-outline';
  };

  return (
    <TouchableOpacity 
      style={[
        commonStyles.card,
        {
          width: '48%',
          marginBottom: 12,
          marginRight: '2%',
        }
      ]}
      onPress={() => console.log('Stats card pressed:', title)}
    >
      <View style={[commonStyles.row, { marginBottom: 8 }]}>
        {icon && (
          <Icon 
            name={icon as any} 
            size={16} 
            color={colors.accent} 
            style={{ marginRight: 8 }}
          />
        )}
        <Text style={[commonStyles.textSmall, { color: colors.muted, flex: 1 }]}>
          {title}
        </Text>
      </View>
      
      <Text style={[commonStyles.subtitle, { marginBottom: 4 }]}>
        {value}
      </Text>
      
      {subtitle && (
        <Text style={[commonStyles.textSmall, { color: colors.muted, marginBottom: 4 }]}>
          {subtitle}
        </Text>
      )}
      
      {trend !== undefined && trend !== 0 && (
        <View style={commonStyles.row}>
          <Icon 
            name={getTrendIcon() as any} 
            size={12} 
            color={getTrendColor()} 
          />
          <Text style={[
            commonStyles.textSmall, 
            { 
              color: getTrendColor(),
              marginLeft: 4,
              fontWeight: '600'
            }
          ]}>
            {Math.abs(trend)}%
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}
