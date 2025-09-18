
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { commonStyles, colors } from '../styles/commonStyles';
import Icon from '../components/Icon';

export default function SettingsScreen() {
  const handleAbout = () => {
    router.push('/about');
  };

  const handlePrivacyPolicy = () => {
    Alert.alert(
      'Privacy Policy',
      'This will open our privacy policy in your browser.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Open', 
          onPress: () => Linking.openURL('https://sports360x.com/privacy') 
        }
      ]
    );
  };

  const handleSupport = () => {
    Alert.alert(
      'Support',
      'Need help? Contact our support team.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Email Support', 
          onPress: () => Linking.openURL('mailto:support@sports360x.com') 
        }
      ]
    );
  };

  const settingsOptions = [
    {
      title: 'About this build',
      subtitle: 'App version and features',
      icon: 'information-circle-outline',
      onPress: handleAbout,
    },
    {
      title: 'Privacy Policy',
      subtitle: 'How we handle your data',
      icon: 'shield-checkmark-outline',
      onPress: handlePrivacyPolicy,
    },
    {
      title: 'Support',
      subtitle: 'Get help and contact us',
      icon: 'help-circle-outline',
      onPress: handleSupport,
    },
    {
      title: 'Debug Panel',
      subtitle: 'Developer tools and diagnostics',
      icon: 'bug-outline',
      onPress: () => router.push('/debug'),
    },
  ];

  return (
    <SafeAreaView style={commonStyles.safeArea}>
      <View style={commonStyles.container}>
        <View style={{ padding: 16 }}>
          <Text style={commonStyles.title}>Settings</Text>
          <Text style={commonStyles.textMuted}>App preferences and information</Text>
        </View>

        <ScrollView style={commonStyles.content}>
          <View style={commonStyles.section}>
            {settingsOptions.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  commonStyles.card,
                  { 
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingVertical: 16,
                  }
                ]}
                onPress={option.onPress}
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
                
                <Icon name="chevron-forward-outline" size={20} color={colors.muted} />
              </TouchableOpacity>
            ))}
          </View>

          {/* App Info */}
          <View style={commonStyles.section}>
            <Text style={commonStyles.subtitle}>App Information</Text>
            <View style={commonStyles.card}>
              <View style={[commonStyles.spaceBetween, { marginBottom: 8 }]}>
                <Text style={commonStyles.text}>Version</Text>
                <Text style={[commonStyles.text, { color: colors.accent }]}>1.0.0</Text>
              </View>
              <View style={[commonStyles.spaceBetween, { marginBottom: 8 }]}>
                <Text style={commonStyles.text}>Build</Text>
                <Text style={[commonStyles.text, { color: colors.accent }]}>
                  {new Date().toLocaleDateString()}
                </Text>
              </View>
              <View style={commonStyles.spaceBetween}>
                <Text style={commonStyles.text}>Bundle ID</Text>
                <Text style={[commonStyles.textSmall, { color: colors.muted }]}>
                  com.sports360x.app
                </Text>
              </View>
            </View>
          </View>

          {/* Data Usage */}
          <View style={commonStyles.section}>
            <Text style={commonStyles.subtitle}>Data Usage</Text>
            <View style={commonStyles.card}>
              <Text style={[commonStyles.text, { marginBottom: 8 }]}>
                Analytics Only
              </Text>
              <Text style={commonStyles.textMuted}>
                Sports 360 X collects anonymous usage data to improve your experience. 
                We analyze sports statistics and provide insights based on publicly available data. 
                No personal betting information is shared or stored externally.
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
