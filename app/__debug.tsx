
import React, { useEffect, useState, useMemo } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { commonStyles, colors } from "../styles/commonStyles";
import Icon from "../components/Icon";

type Ping = {
  url: string;
  status: 'success' | 'error' | 'pending';
  responseTime?: number;
  error?: string;
};

const styles = StyleSheet.create({
  debugContainer: {
    backgroundColor: colors.card,
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  routeButton: {
    backgroundColor: colors.secondary,
    padding: 12,
    borderRadius: 8,
    marginVertical: 4,
  },
});

export default function WebDebugScreen() {
  const [pings, setPings] = useState<Ping[]>([]);

  const targets = useMemo(() => [
    { url: '/api/health', label: 'Health Check' },
    { url: '/api/scores', label: 'Scores API' },
    { url: 'https://httpbin.org/status/200', label: 'External API' },
  ], []);

  useEffect(() => {
    const pingTargets = async () => {
      const results: Ping[] = [];
      
      for (const target of targets) {
        const startTime = Date.now();
        try {
          const response = await fetch(target.url);
          const endTime = Date.now();
          results.push({
            url: target.url,
            status: response.ok ? 'success' : 'error',
            responseTime: endTime - startTime,
          });
        } catch (error) {
          results.push({
            url: target.url,
            status: 'error',
            error: error instanceof Error ? error.message : 'Unknown error',
          });
        }
      }
      
      setPings(results);
    };

    pingTargets();
  }, [targets]);

  const handleRoutePress = (route: string) => {
    console.log('Navigating to:', route);
    router.push(route as any);
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <SafeAreaView style={commonStyles.safeArea}>
      <View style={commonStyles.container}>
        <View style={[commonStyles.row, { padding: 16, alignItems: 'center' }]}>
          <TouchableOpacity onPress={handleBack} style={{ marginRight: 16 }}>
            <Icon name="arrow-back-outline" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={commonStyles.title}>Web Debug Panel</Text>
        </View>

        <ScrollView style={commonStyles.content}>
          <View style={styles.debugContainer}>
            <Text style={commonStyles.subtitle}>Environment</Text>
            <Text style={commonStyles.text}>Platform: {Platform.OS}</Text>
            <Text style={commonStyles.text}>Version: {Platform.Version}</Text>
            <Text style={commonStyles.text}>Debug: {__DEV__ ? 'Yes' : 'No'}</Text>
          </View>

          <View style={styles.debugContainer}>
            <Text style={commonStyles.subtitle}>API Health</Text>
            {pings.map((ping, index) => (
              <View key={index} style={[commonStyles.row, { marginVertical: 4 }]}>
                <View
                  style={[
                    styles.statusDot,
                    {
                      backgroundColor:
                        ping.status === 'success'
                          ? colors.success
                          : ping.status === 'error'
                          ? colors.error
                          : colors.warning,
                    },
                  ]}
                />
                <Text style={commonStyles.text}>{ping.url}</Text>
                {ping.responseTime && (
                  <Text style={[commonStyles.textSmall, { marginLeft: 8 }]}>
                    ({ping.responseTime}ms)
                  </Text>
                )}
              </View>
            ))}
          </View>

          <View style={styles.debugContainer}>
            <Text style={commonStyles.subtitle}>Navigation</Text>
            {[
              { route: '/', label: 'Scores' },
              { route: '/aiinsights', label: 'AI Insights' },
              { route: '/mybets', label: 'My Bets' },
              { route: '/favorites', label: 'Favorites' },
              { route: '/settings', label: 'Settings' },
            ].map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.routeButton}
                onPress={() => handleRoutePress(item.route)}
              >
                <Text style={commonStyles.text}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
