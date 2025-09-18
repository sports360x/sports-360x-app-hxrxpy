
import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { commonStyles, colors } from "../styles/commonStyles";
import { router } from "expo-router";
import Icon from "../components/Icon";

type Ping = { ok: boolean; status: number; text: string };

export default function DebugScreen() {
  const [env, setEnv] = useState<Record<string, string | undefined>>({});
  const [routes] = useState<string[]>([
    "/", "/analytics", "/favorites", "/news", "/community", "/debug"
  ]);
  const [pings, setPings] = useState<Record<string, Ping>>({});

  const targets = [
    "/api/scores?date=2025-09-17&league=ALL",
    "/api/scores?date=2025-09-17&league=MLB",
    "/api/health",
  ];

  useEffect(() => {
    console.log("DebugScreen: Loading environment variables and pinging APIs");
    
    // Expose selected env vars (adjust to your setup)
    setEnv({
      NODE_ENV: process.env.NODE_ENV,
      EXPO_PUBLIC_API_URL: process.env.EXPO_PUBLIC_API_URL,
      APP_VARIANT: process.env.APP_VARIANT,
    });

    (async () => {
      const out: Record<string, Ping> = {};
      for (const url of targets) {
        try {
          console.log(`DebugScreen: Pinging ${url}`);
          const res = await fetch(url);
          const text = await res.text();
          out[url] = { ok: res.ok, status: res.status, text: text.slice(0, 400) };
          console.log(`DebugScreen: ${url} responded with status ${res.status}`);
        } catch (e: any) {
          console.log(`DebugScreen: Error pinging ${url}:`, e?.message || e);
          out[url] = { ok: false, status: -1, text: String(e?.message || e) };
        }
      }
      setPings(out);
    })();
  }, [targets]);

  const handleRoutePress = (route: string) => {
    console.log(`DebugScreen: Navigating to ${route}`);
    try {
      router.push(route as any);
    } catch (error) {
      console.log(`DebugScreen: Error navigating to ${route}:`, error);
    }
  };

  const handleBack = () => {
    console.log("DebugScreen: Going back");
    router.back();
  };

  return (
    <SafeAreaView style={commonStyles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={commonStyles.title}>Debug Panel</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={commonStyles.container} contentContainerStyle={styles.content}>
        <Text style={styles.appTitle}>Sports 360 X — Debug</Text>
        
        <View style={styles.section}>
          <Text style={commonStyles.subtitle}>Routes</Text>
          <View style={commonStyles.card}>
            {routes.map(route => (
              <TouchableOpacity 
                key={route} 
                style={styles.routeItem}
                onPress={() => handleRoutePress(route)}
              >
                <Text style={styles.routeText}>{route}</Text>
                <Icon name="chevron-forward" size={16} color={colors.muted} />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={commonStyles.subtitle}>Environment</Text>
          <View style={[commonStyles.card, styles.codeContainer]}>
            <Text style={styles.codeText}>
              {JSON.stringify(env, null, 2)}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={commonStyles.subtitle}>API Pings</Text>
          {Object.entries(pings).length === 0 ? (
            <View style={commonStyles.card}>
              <Text style={commonStyles.textMuted}>Loading API status...</Text>
            </View>
          ) : (
            Object.entries(pings).map(([url, ping]) => (
              <View key={url} style={[commonStyles.card, styles.pingCard]}>
                <Text style={styles.pingUrl}>{url}</Text>
                <View style={styles.pingStatus}>
                  <View style={styles.statusRow}>
                    <Text style={commonStyles.textMuted}>Status: {ping.status}</Text>
                    <View style={[styles.statusIndicator, { backgroundColor: ping.ok ? colors.success : colors.error }]} />
                    <Text style={commonStyles.textMuted}>OK: {String(ping.ok)}</Text>
                  </View>
                </View>
                <View style={[styles.codeContainer, styles.responseContainer]}>
                  <Text style={styles.codeText} numberOfLines={10}>
                    {ping.text}
                  </Text>
                </View>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    padding: 8,
  },
  placeholder: {
    width: 40,
  },
  content: {
    padding: 16,
  },
  appTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 24,
  },
  section: {
    marginVertical: 16,
  },
  routeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  routeText: {
    fontSize: 16,
    color: colors.accent,
    fontWeight: '500',
  },
  codeContainer: {
    backgroundColor: colors.background,
    borderRadius: 8,
    padding: 12,
  },
  codeText: {
    fontFamily: Platform.select({
      ios: 'Courier',
      android: 'monospace',
      default: 'monospace',
    }),
    fontSize: 12,
    color: colors.text,
    lineHeight: 16,
  },
  pingCard: {
    marginVertical: 6,
  },
  pingUrl: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  pingStatus: {
    marginBottom: 8,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  responseContainer: {
    backgroundColor: colors.secondary,
    maxHeight: 200,
  },
});
