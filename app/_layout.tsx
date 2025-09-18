
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
            tabBarInactiveTintColor: colors.muted,
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
            name="analytics"
            options={{
              title: 'Analytics',
              tabBarIcon: ({ color, size }) => (
                <Icon name="analytics-outline" size={size} color={color} />
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
            name="news"
            options={{
              title: 'News',
              tabBarIcon: ({ color, size }) => (
                <Icon name="newspaper-outline" size={size} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="community"
            options={{
              title: 'Community',
              tabBarIcon: ({ color, size }) => (
                <Icon name="people-outline" size={size} color={color} />
              ),
            }}
          />
        </Tabs>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
