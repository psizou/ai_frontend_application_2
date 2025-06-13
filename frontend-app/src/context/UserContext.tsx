import React, { createContext, useContext, useReducer } from 'react';
import type { User } from '../types/user';

type UserState = {
  users: User[];
  selectedUser: User | null;
  isModalOpen: boolean;
  isLoading: boolean;
  error: Error | null;
};

type UserAction =
  | { type: 'FETCH_USERS_START' }
  | { type: 'FETCH_USERS_SUCCESS'; payload: User[] }
  | { type: 'FETCH_USERS_ERROR'; payload: Error }
  | { type: 'DELETE_USER'; payload: number }
  | { type: 'SELECT_USER'; payload: User }
  | { type: 'CLOSE_MODAL' };

const initialState: UserState = {
  users: [],
  selectedUser: null,
  isModalOpen: false,
  isLoading: false,
  error: null,
};

const userReducer = (state: UserState, action: UserAction): UserState => {
  switch (action.type) {
    case 'FETCH_USERS_START':
      return { ...state, isLoading: true, error: null };
    case 'FETCH_USERS_SUCCESS':
      return { ...state, users: action.payload, isLoading: false };
    case 'FETCH_USERS_ERROR':
      return { ...state, error: action.payload, isLoading: false };
    case 'DELETE_USER':
      return { ...state, users: state.users.filter(user => user.id !== action.payload) };
    case 'SELECT_USER':
      return { ...state, selectedUser: action.payload, isModalOpen: true };
    case 'CLOSE_MODAL':
      return { ...state, isModalOpen: false, selectedUser: null };
    default:
      return state;
  }
};

type UserContextType = {
  state: UserState;
  dispatch: React.Dispatch<UserAction>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
