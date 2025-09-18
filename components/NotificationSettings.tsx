
import React, { useState, useEffect } from 'react';
import { View, Text, Switch, Alert } from 'react-native';
import { commonStyles, colors } from '../styles/commonStyles';
import Icon from './Icon';
import {
  NotificationSettings as NotificationSettingsType,
  getNotificationSettings,
  updateNotificationSettings,
  registerForPushNotificationsAsync,
} from '../utils/notificationService';

export default function NotificationSettings() {
  const [settings, setSettings] = useState<NotificationSettingsType>({
    bestBets: true,
    favoriteTeams: true,
    betResults: true,
    gameAlerts: true,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const currentSettings = await getNotificationSettings();
      setSettings(currentSettings);
    } catch (error) {
      console.log('Error loading notification settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSettingChange = async (key: keyof NotificationSettingsType, value: boolean) => {
    try {
      // If enabling any notification for the first time, request permissions
      if (value && !Object.values(settings).some(Boolean)) {
        const token = await registerForPushNotificationsAsync();
        if (!token) {
          Alert.alert(
            'Permission Required',
            'Please enable notifications in your device settings to receive alerts.',
            [{ text: 'OK' }]
          );
          return;
        }
      }

      const newSettings = { ...settings, [key]: value };
      setSettings(newSettings);
      await updateNotificationSettings(newSettings);
      console.log(`Notification setting ${key} changed to ${value}`);
    } catch (error) {
      console.log('Error updating notification setting:', error);
    }
  };

  const settingsOptions = [
    {
      key: 'bestBets' as keyof NotificationSettingsType,
      title: 'Best Bets of the Day',
      subtitle: 'Daily AI-powered recommendations',
      icon: 'star-outline',
    },
    {
      key: 'favoriteTeams' as keyof NotificationSettingsType,
      title: 'Favorite Team Alerts',
      subtitle: 'Game start notifications for followed teams',
      icon: 'heart-outline',
    },
    {
      key: 'betResults' as keyof NotificationSettingsType,
      title: 'Bet Result Updates',
      subtitle: 'Win/loss notifications for your tracked bets',
      icon: 'receipt-outline',
    },
    {
      key: 'gameAlerts' as keyof NotificationSettingsType,
      title: 'Game Alerts',
      subtitle: 'Live score updates and key moments',
      icon: 'trophy-outline',
    },
  ];

  if (loading) {
    return (
      <View style={commonStyles.card}>
        <Text style={commonStyles.text}>Loading notification settings...</Text>
      </View>
    );
  }

  return (
    <View style={commonStyles.section}>
      <Text style={commonStyles.subtitle}>Push Notifications</Text>
      <Text style={[commonStyles.textMuted, { marginBottom: 16 }]}>
        Stay updated with personalized alerts
      </Text>

      {settingsOptions.map((option) => (
        <View
          key={option.key}
          style={[
            commonStyles.card,
            {
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 16,
              marginBottom: 8,
            }
          ]}
        >
          <View style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: colors.secondary,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 16,
          }}>
            <Icon name={option.icon as any} size={20} color={colors.accent} />
          </View>
          
          <View style={{ flex: 1 }}>
            <Text style={[commonStyles.text, { fontWeight: '600' }]}>
              {option.title}
            </Text>
            <Text style={[commonStyles.textMuted, { marginTop: 2 }]}>
              {option.subtitle}
            </Text>
          </View>
          
          <Switch
            value={settings[option.key]}
            onValueChange={(value) => handleSettingChange(option.key, value)}
            trackColor={{ false: colors.border, true: colors.accent }}
            thumbColor={settings[option.key] ? colors.background : colors.muted}
          />
        </View>
      ))}

      <View style={[commonStyles.card, { backgroundColor: `${colors.accent}10` }]}>
        <View style={[commonStyles.row, { marginBottom: 8 }]}>
          <Icon name="information-circle-outline" size={16} color={colors.accent} />
          <Text style={[commonStyles.textSmall, { marginLeft: 8, color: colors.accent, fontWeight: '600' }]}>
            Notification Tips
          </Text>
        </View>
        <Text style={[commonStyles.textSmall, { color: colors.text, lineHeight: 18 }]}>
          • Best bets are sent daily at 9 AM{'\n'}
          • Game alerts are sent 30 minutes before start{'\n'}
          • Bet results are updated when games finish{'\n'}
          • You can disable notifications anytime in device settings
        </Text>
      </View>
    </View>
  );
}
