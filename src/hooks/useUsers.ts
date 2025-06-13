import { useEffect, useState, useCallback } from 'react';
import { useUser } from '../context/UserContext';
import { fetchUsers, deleteUser } from '../services/api';

export const useUsers = () => {
  const { state, dispatch } = useUser();
  const [userToDelete, setUserToDelete] = useState<number | null>(null);

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

  const handleDeleteUser = useCallback(async (userId: number) => {
    setUserToDelete(userId);
  }, []);

  const confirmDelete = useCallback(async () => {
    if (userToDelete === null) return;

    const userId = userToDelete;
    setUserToDelete(null);
    
    dispatch({ type: 'DELETE_USER_START', payload: userId });
    
    try {
      await deleteUser(userId);
      dispatch({ type: 'DELETE_USER_SUCCESS', payload: userId });
    } catch (error) {
      dispatch({
        type: 'DELETE_USER_ERROR',
        payload: { userId, error: error as Error },
      });
    }
  }, [userToDelete, dispatch]);

  const cancelDelete = useCallback(() => {
    setUserToDelete(null);
  }, []);

  const selectUser = useCallback((userId: number) => {
    const user = state.users.find(u => u.id === userId);
    if (user) {
      dispatch({ type: 'SELECT_USER', payload: user });
    }
  }, [state.users, dispatch]);

  const closeModal = useCallback(() => {
    dispatch({ type: 'CLOSE_MODAL' });
  }, [dispatch]);

  return {
    users: state.users,
    selectedUser: state.selectedUser,
    isModalOpen: state.isModalOpen,
    isLoading: state.isLoading,
    error: state.error,
    pendingDeletes: state.pendingDeletes,
    deleteUser: handleDeleteUser,
    confirmDelete,
    cancelDelete,
    userToDelete,
    selectUser,
    closeModal,
  };
}; 