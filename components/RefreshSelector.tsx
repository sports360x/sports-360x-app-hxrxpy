
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { commonStyles, colors } from '../styles/commonStyles';
import Icon from './Icon';
import SimpleBottomSheet from './BottomSheet';

interface RefreshSelectorProps {
  isVisible: boolean;
  currentInterval: number;
  onSelect: (interval: number) => void;
  onClose: () => void;
}

export default function RefreshSelector({ 
  isVisible, 
  currentInterval, 
  onSelect, 
  onClose 
}: RefreshSelectorProps) {
  const intervals = [
    { value: 10, label: '10 seconds', description: 'Very fast updates' },
    { value: 15, label: '15 seconds', description: 'Fast updates' },
    { value: 20, label: '20 seconds', description: 'Balanced updates' },
    { value: 30, label: '30 seconds', description: 'Slower updates' },
  ];

  return (
    <SimpleBottomSheet isVisible={isVisible} onClose={onClose}>
      <View style={{ padding: 20 }}>
        <View style={[commonStyles.row, { marginBottom: 20, alignItems: 'center' }]}>
          <Icon name="refresh-outline" size={24} color={colors.accent} />
          <Text style={[commonStyles.title, { marginLeft: 12, fontSize: 20 }]}>
            Tune Refresh Rate
          </Text>
        </View>
        
        <Text style={[commonStyles.textMuted, { marginBottom: 20 }]}>
          Choose how often scores update automatically. Faster updates use more battery.
        </Text>

        {intervals.map((interval) => (
          <TouchableOpacity
            key={interval.value}
            style={[
              commonStyles.card,
              {
                marginBottom: 12,
                borderWidth: currentInterval === interval.value ? 2 : 0,
                borderColor: colors.accent,
                backgroundColor: currentInterval === interval.value 
                  ? `${colors.accent}20` 
                  : colors.card,
              }
            ]}
            onPress={() => onSelect(interval.value)}
          >
            <View style={[commonStyles.spaceBetween, { alignItems: 'center' }]}>
              <View style={{ flex: 1 }}>
                <Text style={[
                  commonStyles.text, 
                  { 
                    fontWeight: currentInterval === interval.value ? '600' : '400',
                    color: currentInterval === interval.value ? colors.accent : colors.text
                  }
                ]}>
                  {interval.label}
                </Text>
                <Text style={[commonStyles.textMuted, { marginTop: 2 }]}>
                  {interval.description}
                </Text>
              </View>
              
              {currentInterval === interval.value && (
                <Icon name="checkmark-circle" size={24} color={colors.accent} />
              )}
            </View>
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          style={[
            {
              backgroundColor: colors.secondary,
              paddingVertical: 12,
              borderRadius: 8,
              marginTop: 20,
            },
            commonStyles.center
          ]}
          onPress={onClose}
        >
          <Text style={[commonStyles.text, { fontWeight: '600' }]}>
            Cancel
          </Text>
        </TouchableOpacity>
      </View>
    </SimpleBottomSheet>
  );
}
