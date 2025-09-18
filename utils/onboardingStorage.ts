
import AsyncStorage from '@react-native-async-storage/async-storage';

const ONBOARDING_KEY = '@sports360x_onboarding_completed';

export const checkOnboardingCompleted = async (): Promise<boolean> => {
  try {
    const completed = await AsyncStorage.getItem(ONBOARDING_KEY);
    return completed === 'true';
  } catch (error) {
    console.log('Error checking onboarding status:', error);
    return false;
  }
};

export const setOnboardingCompleted = async (): Promise<void> => {
  try {
    await AsyncStorage.setItem(ONBOARDING_KEY, 'true');
  } catch (error) {
    console.log('Error setting onboarding completed:', error);
  }
};

export const resetOnboarding = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(ONBOARDING_KEY);
  } catch (error) {
    console.log('Error resetting onboarding:', error);
  }
};
