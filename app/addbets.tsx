
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { commonStyles, colors, buttonStyles } from '../styles/commonStyles';
import { BetType } from '../types/bets';
import { addBet } from '../utils/betStorage';
import Icon from '../components/Icon';

const AddBetScreen = () => {
  const [sport, setSport] = useState('');
  const [league, setLeague] = useState('');
  const [teamPlayer, setTeamPlayer] = useState('');
  const [betType, setBetType] = useState<BetType>('Spread');
  const [wagerAmount, setWagerAmount] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);

  const betTypes: BetType[] = ['Spread', 'Moneyline', 'Over/Under', 'Prop Bet', 'Parlay'];
  const leagues = ['NBA', 'NFL', 'MLB', 'NHL', 'Other'];
  const sports = ['Basketball', 'Football', 'Baseball', 'Hockey', 'Soccer', 'Other'];

  const handleSubmit = async () => {
    if (!sport || !league || !teamPlayer || !wagerAmount) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    const wager = parseFloat(wagerAmount);
    if (isNaN(wager) || wager <= 0) {
      Alert.alert('Error', 'Please enter a valid wager amount');
      return;
    }

    setLoading(true);
    try {
      console.log('Adding new bet...');
      await addBet({
        sport,
        league,
        teamPlayer,
        betType,
        wagerAmount: wager,
        notes,
        status: 'Pending',
      });

      Alert.alert('Success', 'Bet added successfully!', [
        { text: 'OK', onPress: () => router.back() },
      ]);
    } catch (error) {
      console.error('Error adding bet:', error);
      Alert.alert('Error', 'Failed to add bet. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderPickerSection = (
    title: string,
    options: string[],
    selectedValue: string,
    onSelect: (value: string) => void
  ) => (
    <View style={{ marginVertical: 16 }}>
      <Text style={[commonStyles.subtitle, { marginBottom: 8 }]}>{title}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {options.map((option) => (
          <TouchableOpacity
            key={option}
            style={{
              backgroundColor: selectedValue === option ? colors.accent : colors.secondary,
              paddingHorizontal: 16,
              paddingVertical: 8,
              borderRadius: 20,
              marginRight: 8,
            }}
            onPress={() => onSelect(option)}
          >
            <Text
              style={{
                color: selectedValue === option ? 'white' : colors.text,
                fontWeight: '600',
              }}
            >
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  return (
    <SafeAreaView style={commonStyles.safeArea}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView style={commonStyles.container}>
          {/* Header */}
          <View style={[commonStyles.content, { paddingTop: 16 }]}>
            <View style={commonStyles.spaceBetween}>
              <TouchableOpacity
                onPress={() => router.back()}
                style={{ padding: 8, marginLeft: -8 }}
              >
                <Icon name="arrow-back" size={24} color={colors.text} />
              </TouchableOpacity>
              <Text style={commonStyles.title}>Add Bet</Text>
              <View style={{ width: 40 }} />
            </View>
          </View>

          <View style={commonStyles.content}>
            {/* Sport Selection */}
            {renderPickerSection('Sport *', sports, sport, setSport)}

            {/* League Selection */}
            {renderPickerSection('League *', leagues, league, setLeague)}

            {/* Bet Type Selection */}
            {renderPickerSection('Bet Type', betTypes, betType, setBetType)}

            {/* Team/Player Input */}
            <View style={{ marginVertical: 16 }}>
              <Text style={[commonStyles.subtitle, { marginBottom: 8 }]}>
                Team/Player *
              </Text>
              <TextInput
                style={{
                  backgroundColor: colors.card,
                  borderRadius: 8,
                  padding: 16,
                  color: colors.text,
                  fontSize: 16,
                }}
                placeholder="e.g., Lakers vs Warriors, LeBron James"
                placeholderTextColor={colors.muted}
                value={teamPlayer}
                onChangeText={setTeamPlayer}
              />
            </View>

            {/* Wager Amount Input */}
            <View style={{ marginVertical: 16 }}>
              <Text style={[commonStyles.subtitle, { marginBottom: 8 }]}>
                Wager Amount *
              </Text>
              <TextInput
                style={{
                  backgroundColor: colors.card,
                  borderRadius: 8,
                  padding: 16,
                  color: colors.text,
                  fontSize: 16,
                }}
                placeholder="0.00"
                placeholderTextColor={colors.muted}
                value={wagerAmount}
                onChangeText={setWagerAmount}
                keyboardType="decimal-pad"
              />
            </View>

            {/* Notes Input */}
            <View style={{ marginVertical: 16 }}>
              <Text style={[commonStyles.subtitle, { marginBottom: 8 }]}>
                Notes (Optional)
              </Text>
              <TextInput
                style={{
                  backgroundColor: colors.card,
                  borderRadius: 8,
                  padding: 16,
                  color: colors.text,
                  fontSize: 16,
                  minHeight: 80,
                }}
                placeholder="Add any notes about this bet..."
                placeholderTextColor={colors.muted}
                value={notes}
                onChangeText={setNotes}
                multiline
                textAlignVertical="top"
              />
            </View>

            {/* Submit Button */}
            <TouchableOpacity
              style={[
                buttonStyles.primary,
                {
                  marginVertical: 32,
                  opacity: loading ? 0.7 : 1,
                },
              ]}
              onPress={handleSubmit}
              disabled={loading}
            >
              <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>
                {loading ? 'Adding Bet...' : 'Add Bet'}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AddBetScreen;
