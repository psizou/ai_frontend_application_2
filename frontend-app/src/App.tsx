import React from 'react';
import { UserProvider } from './context/UserContext';
import UserTable from './components/UserTable';
import UserDetailModal from './components/UserDetailModal';
import { useUsers } from './hooks/useUsers';

const AppContent: React.FC = () => {
  const {
    users,
    selectedUser,
    isModalOpen,
    isLoading,
    error,
    deleteUser,
    selectUser,
    closeModal,
  } = useUsers();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <UserTable
        users={users}
        onUserClick={selectUser}
        onDeleteUser={deleteUser}
      />
      {isModalOpen && selectedUser && (
        <UserDetailModal user={selectedUser} onClose={closeModal} />
      )}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  );
};

export default App;