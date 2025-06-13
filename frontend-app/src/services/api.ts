import type { User } from '../types/user';
import { USERS_API_URL } from '../constants/api';

export const fetchUsers = async (): Promise<User[]> => {
  try {
    const response = await fetch(USERS_API_URL);
    if (!response.ok) throw new Error('Failed to fetch users');
    return response.json();
  } catch (error) {
    throw error;
  }
};