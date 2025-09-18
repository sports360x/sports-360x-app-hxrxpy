
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { commonStyles, colors } from '../styles/commonStyles';
import Icon from '../components/Icon';

export default function AboutScreen() {
  const handleBackPress = () => {
    router.back();
  };

  const handleSupportEmail = () => {
    Linking.openURL('mailto:support@sports360x.com?subject=Sports 360 X Support');
  };

  const handlePrivacyPolicy = () => {
    Linking.openURL('https://sports360x.com/privacy');
  };

  const handleTermsOfService = () => {
    Linking.openURL('https://sports360x.com/terms');
  };

  const features = [
    {
      icon: 'bulb-outline',
      title: 'AI Insights',
      description: 'Advanced AI analyzes thousands of data points for smart predictions',
      color: colors.confidence,
    },
    {
      icon: 'refresh-outline',
      title: 'Custom Refresh',
      description: 'Personalized refresh intervals for real-time score updates',
      color: colors.accent,
    },
    {
      icon: 'receipt-outline',
      title: 'Bets Tracker',
      description: 'Manual bet tracking with performance analytics and ROI',
      color: colors.streak,
    },
    {
      icon: 'heart-outline',
      title: 'Favorites',
      description: 'Follow teams and players for personalized insights feed',
      color: colors.success,
    },
    {
      icon: 'trophy-outline',
      title: 'Multi-Sport',
      description: 'NBA, NFL, MLB, Soccer, and Tennis coverage',
      color: colors.premium,
    },
    {
      icon: 'notifications-outline',
      title: 'Smart Alerts',
      description: 'Push notifications for best bets and favorite teams',
      color: colors.live,
    },
  ];

  return (
    <SafeAreaView style={commonStyles.safeArea}>
      <View style={commonStyles.container}>
        {/* Header */}
        <Animated.View 
          style={[commonStyles.row, { padding: 16, alignItems: 'center' }]}
          entering={FadeInUp.duration(600)}
        >
          <TouchableOpacity
            onPress={handleBackPress}
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: colors.card,
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 16,
            }}
          >
            <Icon name="arrow-back-outline" size={20} color={colors.text} />
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            <Text style={commonStyles.title}>About Sports 360 X</Text>
            <Text style={commonStyles.textMuted}>Version 1.0.0</Text>
          </View>
        </Animated.View>

        <ScrollView style={commonStyles.content}>
          {/* App Description */}
          <Animated.View 
            style={commonStyles.section}
            entering={FadeInDown.duration(400).delay(100)}
          >
            <View style={[commonStyles.card, { backgroundColor: `${colors.accent}15` }]}>
              <Text style={[commonStyles.text, { marginBottom: 12, fontWeight: '600' }]}>
                The Ultimate Sports Analytics App
              </Text>
              <Text style={[commonStyles.textMuted, { lineHeight: 24 }]}>
                Sports 360 X combines cutting-edge AI technology with comprehensive sports data 
                to deliver personalized insights, real-time scores, and advanced analytics across 
                multiple sports leagues. Track your betting performance, follow your favorite teams, 
                and make informed decisions with confidence ratings and detailed analysis.
              </Text>
            </View>
          </Animated.View>

          {/* Features */}
          <Animated.View 
            style={commonStyles.section}
            entering={FadeInDown.duration(400).delay(200)}
          >
            <Text style={[commonStyles.subtitle, { marginBottom: 16 }]}>Key Features</Text>
            {features.map((feature, index) => (
              <Animated.View
                key={index}
                style={[
                  commonStyles.card,
                  { 
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 12,
                    borderLeftWidth: 4,
                    borderLeftColor: feature.color,
                  }
                ]}
                entering={FadeInDown.duration(400).delay(300 + index * 100)}
              >
                <View style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: `${feature.color}20`,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 16,
                }}>
                  <Icon name={feature.icon as any} size={20} color={feature.color} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[commonStyles.text, { fontWeight: '600', marginBottom: 4 }]}>
                    {feature.title}
                  </Text>
                  <Text style={[commonStyles.textMuted, { fontSize: 13, lineHeight: 18 }]}>
                    {feature.description}
                  </Text>
                </View>
              </Animated.View>
            ))}
          </Animated.View>

          {/* Build Information */}
          <Animated.View 
            style={commonStyles.section}
            entering={FadeInDown.duration(400).delay(800)}
          >
            <Text style={[commonStyles.subtitle, { marginBottom: 16 }]}>Build Information</Text>
            <View style={commonStyles.card}>
              <View style={[commonStyles.spaceBetween, { marginBottom: 12 }]}>
                <Text style={commonStyles.text}>Version</Text>
                <Text style={[commonStyles.text, { color: colors.accent, fontWeight: '600' }]}>
                  1.0.0
                </Text>
              </View>
              <View style={[commonStyles.spaceBetween, { marginBottom: 12 }]}>
                <Text style={commonStyles.text}>Build Date</Text>
                <Text style={[commonStyles.text, { color: colors.accent }]}>
                  {new Date().toLocaleDateString()}
                </Text>
              </View>
              <View style={[commonStyles.spaceBetween, { marginBottom: 12 }]}>
                <Text style={commonStyles.text}>Bundle ID</Text>
                <Text style={[commonStyles.textSmall, { color: colors.muted }]}>
                  com.sports360x.app
                </Text>
              </View>
              <View style={[commonStyles.spaceBetween, { marginBottom: 12 }]}>
                <Text style={commonStyles.text}>Platform</Text>
                <Text style={[commonStyles.text, { color: colors.accent }]}>
                  React Native + Expo
                </Text>
              </View>
              <View style={commonStyles.spaceBetween}>
                <Text style={commonStyles.text}>Age Rating</Text>
                <Text style={[commonStyles.text, { color: colors.success }]}>
                  4+ (Analytics Only)
                </Text>
              </View>
            </View>
          </Animated.View>

          {/* Support & Legal */}
          <Animated.View 
            style={commonStyles.section}
            entering={FadeInDown.duration(400).delay(900)}
          >
            <Text style={[commonStyles.subtitle, { marginBottom: 16 }]}>Support & Legal</Text>
            
            <TouchableOpacity
              style={[
                commonStyles.card,
                { flexDirection: 'row', alignItems: 'center', marginBottom: 12 }
              ]}
              onPress={handleSupportEmail}
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
                <Icon name="mail-outline" size={20} color={colors.accent} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[commonStyles.text, { fontWeight: '600' }]}>
                  Contact Support
                </Text>
                <Text style={[commonStyles.textMuted, { marginTop: 2 }]}>
                  support@sports360x.com
                </Text>
              </View>
              <Icon name="chevron-forward-outline" size={20} color={colors.muted} />
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                commonStyles.card,
                { flexDirection: 'row', alignItems: 'center', marginBottom: 12 }
              ]}
              onPress={handlePrivacyPolicy}
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
                <Icon name="shield-checkmark-outline" size={20} color={colors.accent} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[commonStyles.text, { fontWeight: '600' }]}>
                  Privacy Policy
                </Text>
                <Text style={[commonStyles.textMuted, { marginTop: 2 }]}>
                  How we handle your data
                </Text>
              </View>
              <Icon name="chevron-forward-outline" size={20} color={colors.muted} />
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                commonStyles.card,
                { flexDirection: 'row', alignItems: 'center' }
              ]}
              onPress={handleTermsOfService}
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
                <Icon name="document-text-outline" size={20} color={colors.accent} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[commonStyles.text, { fontWeight: '600' }]}>
                  Terms of Service
                </Text>
                <Text style={[commonStyles.textMuted, { marginTop: 2 }]}>
                  App usage terms and conditions
                </Text>
              </View>
              <Icon name="chevron-forward-outline" size={20} color={colors.muted} />
            </TouchableOpacity>
          </Animated.View>

          {/* Company Footer */}
          <Animated.View 
            style={[commonStyles.section, { alignItems: 'center', paddingBottom: 40 }]}
            entering={FadeInDown.duration(400).delay(1000)}
          >
            <View style={[commonStyles.card, { alignItems: 'center', backgroundColor: `${colors.accent}10` }]}>
              <Text style={[commonStyles.text, { fontWeight: '700', marginBottom: 8, color: colors.accent }]}>
                Sports Analytics Inc.
              </Text>
              <Text style={[commonStyles.textMuted, { textAlign: 'center', marginBottom: 8 }]}>
                Empowering sports fans with data-driven insights
              </Text>
              <Text style={[commonStyles.textSmall, { color: colors.muted, textAlign: 'center' }]}>
                © 2024 Sports Analytics Inc. All rights reserved.{'\n'}
                Made with ❤️ for sports analytics enthusiasts
              </Text>
            </View>
          </Animated.View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
