
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Bet, BetStats } from '../types/bets';

const BETS_STORAGE_KEY = '@sports360x_bets';

export const saveBets = async (bets: Bet[]): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(bets);
    await AsyncStorage.setItem(BETS_STORAGE_KEY, jsonValue);
    console.log('Bets saved successfully');
  } catch (error) {
    console.error('Error saving bets:', error);
    throw error;
  }
};

export const loadBets = async (): Promise<Bet[]> => {
  try {
    const jsonValue = await AsyncStorage.getItem(BETS_STORAGE_KEY);
    if (jsonValue != null) {
      const bets = JSON.parse(jsonValue);
      console.log('Loaded bets:', bets.length);
      return bets;
    }
    return [];
  } catch (error) {
    console.error('Error loading bets:', error);
    return [];
  }
};

export const addBet = async (bet: Omit<Bet, 'id' | 'createdAt' | 'updatedAt'>): Promise<Bet> => {
  try {
    const existingBets = await loadBets();
    const newBet: Bet = {
      ...bet,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    const updatedBets = [...existingBets, newBet];
    await saveBets(updatedBets);
    console.log('New bet added:', newBet.id);
    return newBet;
  } catch (error) {
    console.error('Error adding bet:', error);
    throw error;
  }
};

export const updateBet = async (betId: string, updates: Partial<Bet>): Promise<void> => {
  try {
    const existingBets = await loadBets();
    const betIndex = existingBets.findIndex(bet => bet.id === betId);
    
    if (betIndex === -1) {
      throw new Error('Bet not found');
    }
    
    existingBets[betIndex] = {
      ...existingBets[betIndex],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    
    await saveBets(existingBets);
    console.log('Bet updated:', betId);
  } catch (error) {
    console.error('Error updating bet:', error);
    throw error;
  }
};

export const deleteBet = async (betId: string): Promise<void> => {
  try {
    const existingBets = await loadBets();
    const filteredBets = existingBets.filter(bet => bet.id !== betId);
    await saveBets(filteredBets);
    console.log('Bet deleted:', betId);
  } catch (error) {
    console.error('Error deleting bet:', error);
    throw error;
  }
};

export const calculateBetStats = (bets: Bet[]): BetStats => {
  const totalBets = bets.length;
  const wins = bets.filter(bet => bet.status === 'Won').length;
  const losses = bets.filter(bet => bet.status === 'Lost').length;
  const pending = bets.filter(bet => bet.status === 'Pending' || bet.status === 'Live').length;
  
  const winPercentage = totalBets > 0 ? (wins / (wins + losses)) * 100 : 0;
  
  const totalWagered = bets.reduce((sum, bet) => sum + bet.wagerAmount, 0);
  const totalWon = bets
    .filter(bet => bet.status === 'Won')
    .reduce((sum, bet) => sum + (bet.potentialPayout || bet.wagerAmount * 2), 0);
  
  const roi = totalWagered > 0 ? ((totalWon - totalWagered) / totalWagered) * 100 : 0;
  
  return {
    totalBets,
    wins,
    losses,
    pending,
    winPercentage: Math.round(winPercentage * 100) / 100,
    roi: Math.round(roi * 100) / 100,
    totalWagered,
    totalWon,
  };
};
