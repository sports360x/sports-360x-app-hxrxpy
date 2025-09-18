
import { Tabs } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Platform } from 'react-native';
import { useEffect } from 'react';
import { setupErrorLogging } from '../utils/errorLogger';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { colors } from '../styles/commonStyles';
import Icon from '../components/Icon';

export default function RootLayout() {
  useEffect(() => {
    setupErrorLogging();
  }, []);

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Tabs
          screenOptions={{
            headerShown: false,
            tabBarStyle: {
              backgroundColor: colors.card,
              borderTopColor: colors.border,
              borderTopWidth: 1,
              height: Platform.OS === 'ios' ? 88 : 68,
              paddingBottom: Platform.OS === 'ios' ? 20 : 8,
              paddingTop: 8,
            },
            tabBarActiveTintColor: colors.accent,
            tabBarInactiveTintColor: colors.text,
            tabBarLabelStyle: {
              fontSize: 12,
              fontWeight: '600',
            },
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              title: 'Scores',
              tabBarIcon: ({ color, size }) => (
                <Icon name="trophy-outline" size={size} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="aiinsights"
            options={{
              title: 'AI Insights',
              tabBarIcon: ({ color, size }) => (
                <Icon name="bulb-outline" size={size} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="mybets"
            options={{
              title: 'My Bets',
              tabBarIcon: ({ color, size }) => (
                <Icon name="receipt-outline" size={size} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="favorites"
            options={{
              title: 'Favorites',
              tabBarIcon: ({ color, size }) => (
                <Icon name="heart-outline" size={size} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="settings"
            options={{
              title: 'Settings',
              tabBarIcon: ({ color, size }) => (
                <Icon name="settings-outline" size={size} color={color} />
              ),
            }}
          />
          {/* Hide other screens from tab bar */}
          <Tabs.Screen
            name="analytics"
            options={{
              href: null,
            }}
          />
          <Tabs.Screen
            name="news"
            options={{
              href: null,
            }}
          />
          <Tabs.Screen
            name="community"
            options={{
              href: null,
            }}
          />
          <Tabs.Screen
            name="addbets"
            options={{
              href: null,
            }}
          />
          <Tabs.Screen
            name="debug"
            options={{
              href: null,
            }}
          />
          <Tabs.Screen
            name="__debug"
            options={{
              href: null,
            }}
          />
        </Tabs>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
