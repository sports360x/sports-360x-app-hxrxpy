
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { commonStyles, colors } from '../styles/commonStyles';
import Icon from '../components/Icon';

export default function AboutScreen() {
  const features = [
    {
      title: 'AI Insights',
      description: 'Advanced analytics with confidence ratings and rationale',
      icon: 'bulb-outline',
    },
    {
      title: 'Custom Refresh',
      description: 'User-controlled refresh intervals for live scores',
      icon: 'refresh-outline',
    },
    {
      title: 'Bets Tracker',
      description: 'Personal bet tracking with Win%, ROI%, and performance analytics',
      icon: 'receipt-outline',
    },
    {
      title: 'Favorites',
      description: 'Personalized feed for followed teams and players',
      icon: 'heart-outline',
    },
  ];

  return (
    <SafeAreaView style={commonStyles.safeArea}>
      <View style={commonStyles.container}>
        <View style={[commonStyles.row, { padding: 16, alignItems: 'center' }]}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={{ marginRight: 16 }}
          >
            <Icon name="arrow-back-outline" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={commonStyles.title}>About this build</Text>
        </View>

        <ScrollView style={commonStyles.content}>
          {/* App Info */}
          <View style={commonStyles.section}>
            <View style={[commonStyles.center, { marginBottom: 24 }]}>
              <View style={{
                width: 80,
                height: 80,
                borderRadius: 20,
                backgroundColor: colors.accent,
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 16,
              }}>
                <Text style={{
                  fontSize: 32,
                  fontWeight: 'bold',
                  color: colors.background,
                }}>
                  360
                </Text>
              </View>
              <Text style={[commonStyles.title, { textAlign: 'center' }]}>
                Sports 360 X
              </Text>
              <Text style={[commonStyles.textMuted, { textAlign: 'center' }]}>
                Version 1.0.0
              </Text>
            </View>

            <View style={commonStyles.card}>
              <Text style={[commonStyles.text, { marginBottom: 8 }]}>
                Build Information
              </Text>
              <View style={[commonStyles.spaceBetween, { marginBottom: 4 }]}>
                <Text style={commonStyles.textMuted}>Build Time:</Text>
                <Text style={commonStyles.textMuted}>
                  {new Date().toLocaleString()}
                </Text>
              </View>
              <View style={[commonStyles.spaceBetween, { marginBottom: 4 }]}>
                <Text style={commonStyles.textMuted}>Platform:</Text>
                <Text style={commonStyles.textMuted}>React Native + Expo</Text>
              </View>
              <View style={commonStyles.spaceBetween}>
                <Text style={commonStyles.textMuted}>Bundle ID:</Text>
                <Text style={commonStyles.textMuted}>com.sports360x.app</Text>
              </View>
            </View>
          </View>

          {/* Features */}
          <View style={commonStyles.section}>
            <Text style={commonStyles.subtitle}>Key Features</Text>
            {features.map((feature, index) => (
              <View key={index} style={commonStyles.card}>
                <View style={[commonStyles.row, { marginBottom: 8 }]}>
                  <View style={{
                    width: 32,
                    height: 32,
                    borderRadius: 16,
                    backgroundColor: colors.secondary,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 12,
                  }}>
                    <Icon name={feature.icon as any} size={16} color={colors.accent} />
                  </View>
                  <Text style={[commonStyles.text, { fontWeight: '600', flex: 1 }]}>
                    {feature.title}
                  </Text>
                </View>
                <Text style={commonStyles.textMuted}>
                  {feature.description}
                </Text>
              </View>
            ))}
          </View>

          {/* Support & Privacy */}
          <View style={commonStyles.section}>
            <Text style={commonStyles.subtitle}>Support & Privacy</Text>
            <View style={commonStyles.card}>
              <View style={[commonStyles.spaceBetween, { marginBottom: 12 }]}>
                <Text style={commonStyles.text}>Support URL:</Text>
                <Text style={[commonStyles.textSmall, { color: colors.accent }]}>
                  support@sports360x.com
                </Text>
              </View>
              <View style={commonStyles.spaceBetween}>
                <Text style={commonStyles.text}>Privacy Policy:</Text>
                <Text style={[commonStyles.textSmall, { color: colors.accent }]}>
                  sports360x.com/privacy
                </Text>
              </View>
            </View>
          </View>

          {/* Compliance */}
          <View style={commonStyles.section}>
            <Text style={commonStyles.subtitle}>App Store Compliance</Text>
            <View style={commonStyles.card}>
              <Text style={[commonStyles.text, { marginBottom: 8, fontWeight: '600' }]}>
                Age Rating: 4+
              </Text>
              <Text style={commonStyles.textMuted}>
                Sports 360 X is a sports analytics and personal tracking app. 
                No gambling, wagering, or odds integrations are included. 
                This app provides scores, analytics, and personal bet tracking only.
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
