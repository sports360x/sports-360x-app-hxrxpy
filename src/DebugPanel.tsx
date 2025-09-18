
import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { commonStyles, colors } from "../styles/commonStyles";

type Ping = { ok: boolean; status: number; text: string };

export default function DebugPanel() {
  const [env, setEnv] = useState<Record<string, string | undefined>>({});
  const [routes] = useState<string[]>([
    "/", "/tabs", "/tabs/analytics", "/bet/add", "/scores", "/__debug"
  ]);
  const [pings, setPings] = useState<Record<string, Ping>>({});

  const targets = [
    "/api/scores?date=2025-09-17&league=ALL",
    "/api/scores?date=2025-09-17&league=MLB",
    "/api/health",
  ];

  useEffect(() => {
    console.log("DebugPanel: Loading environment variables and pinging APIs");
    
    // Expose selected env vars (adjust to your setup)
    setEnv({
      NODE_ENV: process.env.NODE_ENV,
      APP_ENV: (process as any).env?.MODE,
      API_URL: (process as any).env?.VITE_API_URL || (process as any).env?.EXPO_PUBLIC_API_URL,
    });

    (async () => {
      const out: Record<string, Ping> = {};
      for (const url of targets) {
        try {
          console.log(`DebugPanel: Pinging ${url}`);
          const res = await fetch(url);
          const text = await res.text();
          out[url] = { ok: res.ok, status: res.status, text: text.slice(0, 400) };
          console.log(`DebugPanel: ${url} responded with status ${res.status}`);
        } catch (e: any) {
          console.log(`DebugPanel: Error pinging ${url}:`, e?.message || e);
          out[url] = { ok: false, status: -1, text: String(e?.message || e) };
        }
      }
      setPings(out);
    })();
  }, [targets]);

  return (
    <SafeAreaView style={commonStyles.safeArea}>
      <ScrollView style={commonStyles.container} contentContainerStyle={styles.content}>
        <Text style={styles.mainTitle}>Sports 360 X — Debug</Text>
        
        <View style={styles.section}>
          <Text style={commonStyles.subtitle}>Routes</Text>
          <View style={commonStyles.card}>
            {routes.map(route => (
              <View key={route} style={styles.routeItem}>
                <Text style={styles.routeText}>{route}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={commonStyles.subtitle}>Env</Text>
          <View style={[commonStyles.card, styles.codeContainer]}>
            <Text style={styles.codeText}>
              {JSON.stringify(env, null, 2)}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={commonStyles.subtitle}>API Pings</Text>
          {Object.entries(pings).map(([url, ping]) => (
            <View key={url} style={[commonStyles.card, styles.pingCard]}>
              <Text style={styles.pingUrl}>{url}</Text>
              <View style={styles.pingStatus}>
                <Text style={commonStyles.textMuted}>
                  Status: {ping.status} • OK: {String(ping.ok)}
                </Text>
              </View>
              <View style={[styles.codeContainer, styles.responseContainer]}>
                <Text style={styles.codeText} numberOfLines={15}>
                  {ping.text}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 16,
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 24,
  },
  section: {
    marginVertical: 16,
  },
  routeItem: {
    paddingVertical: 8,
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
  responseContainer: {
    backgroundColor: colors.secondary,
    maxHeight: 200,
  },
});
