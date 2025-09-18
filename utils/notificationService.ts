
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NOTIFICATION_SETTINGS_KEY = '@sports360x_notification_settings';

export interface NotificationSettings {
  bestBets: boolean;
  favoriteTeams: boolean;
  betResults: boolean;
  gameAlerts: boolean;
}

const defaultSettings: NotificationSettings = {
  bestBets: true,
  favoriteTeams: true,
  betResults: true,
  gameAlerts: true,
};

// Configure notification behavior
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export async function registerForPushNotificationsAsync(): Promise<string | null> {
  let token = null;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#00d4aa',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    
    if (finalStatus !== 'granted') {
      console.log('Failed to get push token for push notification!');
      return null;
    }
    
    try {
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log('Push notification token:', token);
    } catch (error) {
      console.log('Error getting push token:', error);
    }
  } else {
    console.log('Must use physical device for Push Notifications');
  }

  return token;
}

export async function getNotificationSettings(): Promise<NotificationSettings> {
  try {
    const settings = await AsyncStorage.getItem(NOTIFICATION_SETTINGS_KEY);
    return settings ? JSON.parse(settings) : defaultSettings;
  } catch (error) {
    console.log('Error loading notification settings:', error);
    return defaultSettings;
  }
}

export async function updateNotificationSettings(settings: NotificationSettings): Promise<void> {
  try {
    await AsyncStorage.setItem(NOTIFICATION_SETTINGS_KEY, JSON.stringify(settings));
    console.log('Notification settings updated:', settings);
  } catch (error) {
    console.log('Error saving notification settings:', error);
  }
}

export async function scheduleBestBetNotification(betInfo: {
  title: string;
  body: string;
  confidence: number;
}): Promise<void> {
  const settings = await getNotificationSettings();
  if (!settings.bestBets) return;

  try {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: `🎯 ${betInfo.title}`,
        body: `${betInfo.body} (${Math.round(betInfo.confidence * 100)}% confidence)`,
        data: { type: 'best_bet', ...betInfo },
        sound: 'default',
      },
      trigger: {
        seconds: 1,
      },
    });
    console.log('Best bet notification scheduled');
  } catch (error) {
    console.log('Error scheduling best bet notification:', error);
  }
}

export async function scheduleFavoriteTeamAlert(gameInfo: {
  teamName: string;
  opponent: string;
  startTime: string;
  isHome: boolean;
}): Promise<void> {
  const settings = await getNotificationSettings();
  if (!settings.favoriteTeams) return;

  try {
    const gameTime = new Date(gameInfo.startTime);
    const notificationTime = new Date(gameTime.getTime() - 30 * 60 * 1000); // 30 minutes before

    if (notificationTime > new Date()) {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: `🏀 ${gameInfo.teamName} Game Starting Soon`,
          body: `${gameInfo.teamName} ${gameInfo.isHome ? 'vs' : '@'} ${gameInfo.opponent} in 30 minutes`,
          data: { type: 'game_alert', ...gameInfo },
          sound: 'default',
        },
        trigger: notificationTime,
      });
      console.log('Favorite team alert scheduled');
    }
  } catch (error) {
    console.log('Error scheduling favorite team alert:', error);
  }
}

export async function scheduleBetResultNotification(betResult: {
  betDescription: string;
  result: 'won' | 'lost';
  amount: number;
}): Promise<void> {
  const settings = await getNotificationSettings();
  if (!settings.betResults) return;

  try {
    const emoji = betResult.result === 'won' ? '🎉' : '😔';
    const title = betResult.result === 'won' ? 'Bet Won!' : 'Bet Lost';
    
    await Notifications.scheduleNotificationAsync({
      content: {
        title: `${emoji} ${title}`,
        body: `${betResult.betDescription} - $${betResult.amount}`,
        data: { type: 'bet_result', ...betResult },
        sound: 'default',
      },
      trigger: {
        seconds: 1,
      },
    });
    console.log('Bet result notification scheduled');
  } catch (error) {
    console.log('Error scheduling bet result notification:', error);
  }
}

export async function cancelAllNotifications(): Promise<void> {
  try {
    await Notifications.cancelAllScheduledNotificationsAsync();
    console.log('All notifications cancelled');
  } catch (error) {
    console.log('Error cancelling notifications:', error);
  }
}

export async function sendDailyBestBetsNotification(): Promise<void> {
  const settings = await getNotificationSettings();
  if (!settings.bestBets) return;

  try {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: '🔥 Daily Best Bets Ready',
        body: 'Check out today\'s top AI-powered opportunities with high confidence ratings',
        data: { type: 'daily_best_bets' },
        sound: 'default',
      },
      trigger: {
        hour: 9,
        minute: 0,
        repeats: true,
      },
    });
    console.log('Daily best bets notification scheduled');
  } catch (error) {
    console.log('Error scheduling daily best bets notification:', error);
  }
}
