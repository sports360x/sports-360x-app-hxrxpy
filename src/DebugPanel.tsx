
import React, { useEffect, useState, useMemo } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { commonStyles, colors } from "../styles/commonStyles";

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
});

export default function DebugPanel() {
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

  return (
    <SafeAreaView style={commonStyles.safeArea}>
      <View style={commonStyles.container}>
        <View style={{ padding: 16 }}>
          <Text style={commonStyles.title}>Debug Panel</Text>
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
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
