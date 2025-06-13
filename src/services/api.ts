import { User } from '../types/user';
import { USERS_API_URL } from '../constants/api';

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const error = new Error(`HTTP error! status: ${response.status}`);
    error.name = 'HTTPError';
    throw error;
  }
  return response.json();
};

export const fetchUsers = async (retries = 3): Promise<User[]> => {
  let lastError: Error | null = null;
  
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(USERS_API_URL);
      return await handleResponse(response);
    } catch (error) {
      lastError = error as Error;
      if (i < retries - 1) {
        // Wait for 1 second before retrying
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
  }
  
  throw new Error(`Failed to fetch users after ${retries} attempts: ${lastError?.message}`);
};

export const deleteUser = async (userId: number): Promise<void> => {
  const response = await fetch(`${USERS_API_URL}/${userId}`, {
    method: 'DELETE',
  });
  
  if (!response.ok) {
    throw new Error(`Failed to delete user: ${response.status}`);
  }
}; 