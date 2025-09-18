
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { commonStyles, colors } from '../styles/commonStyles';
import Icon from './Icon';

interface DateSelectorProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
}

export default function DateSelector({ selectedDate, onDateChange }: DateSelectorProps) {
  const formatDate = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      });
    }
  };

  const goToPreviousDay = () => {
    const previousDay = new Date(selectedDate);
    previousDay.setDate(previousDay.getDate() - 1);
    onDateChange(previousDay);
  };

  const goToNextDay = () => {
    const nextDay = new Date(selectedDate);
    nextDay.setDate(nextDay.getDate() + 1);
    onDateChange(nextDay);
  };

  const goToToday = () => {
    onDateChange(new Date());
  };

  return (
    <View style={[commonStyles.row, commonStyles.spaceBetween]}>
      <TouchableOpacity
        style={[
          {
            padding: 12,
            borderRadius: 8,
            backgroundColor: colors.card,
          },
          commonStyles.center
        ]}
        onPress={goToPreviousDay}
      >
        <Icon name="chevron-back-outline" size={20} color={colors.text} />
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          {
            flex: 1,
            marginHorizontal: 16,
            paddingVertical: 12,
            borderRadius: 8,
            backgroundColor: colors.card,
          },
          commonStyles.center
        ]}
        onPress={goToToday}
      >
        <Text style={[commonStyles.text, { fontWeight: '600' }]}>
          {formatDate(selectedDate)}
        </Text>
        <Text style={[commonStyles.textSmall, { color: colors.muted }]}>
          {selectedDate.toLocaleDateString('en-US', { 
            weekday: 'long',
            month: 'long',
            day: 'numeric'
          })}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          {
            padding: 12,
            borderRadius: 8,
            backgroundColor: colors.card,
          },
          commonStyles.center
        ]}
        onPress={goToNextDay}
      >
        <Icon name="chevron-forward-outline" size={20} color={colors.text} />
      </TouchableOpacity>
    </View>
  );
}
