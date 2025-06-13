import { useEffect } from 'react';
import { useUser } from '../context/UserContext';
import { fetchUsers } from '../services/api';
import type { User } from '../types/user';

export const useUsers = () => {
  const { state, dispatch } = useUser();

  useEffect(() => {
    const loadUsers = async () => {
      dispatch({ type: 'FETCH_USERS_START' });
      try {
        const users = await fetchUsers();
        dispatch({ type: 'FETCH_USERS_SUCCESS', payload: users });
      } catch (error) {
        dispatch({ type: 'FETCH_USERS_ERROR', payload: error as Error });
      }
    };

    loadUsers();
  }, [dispatch]);

  const deleteUser = (userId: number) => {
    dispatch({ type: 'DELETE_USER', payload: userId });
  };

  const selectUser = (user: User) => {
    dispatch({ type: 'SELECT_USER', payload: user });
  };

  const closeModal = () => {
    dispatch({ type: 'CLOSE_MODAL' });
  };

  return {
    users: state.users,
    selectedUser: state.selectedUser,
    isModalOpen: state.isModalOpen,
    isLoading: state.isLoading,
    error: state.error,
    deleteUser,
    selectUser,
    closeModal,
  };
};