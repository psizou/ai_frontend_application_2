import React from 'react';
import { UserProvider } from './context/UserContext';
import { UserTable } from './components/UserTable';
import { UserDetailModal } from './components/UserDetailModal';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorBoundary } from './components/ErrorBoundary';
import { ConfirmDialog } from './components/ConfirmDialog';
import { useUsers } from './hooks/useUsers';

const AppContent: React.FC = () => {
  const {
    users,
    selectedUser,
    isModalOpen,
    isLoading,
    error,
    pendingDeletes,
    deleteUser,
    confirmDelete,
    cancelDelete,
    userToDelete,
    selectUser,
    closeModal,
  } = useUsers();

  if (isLoading) return <LoadingSpinner />;
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-600 mb-4">{error.message}</p>
          <button
            onClick={() => window.location.reload()}
            className="w-full bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const userToDeleteData = users.find(user => user.id === userToDelete);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-3xl font-bold text-gray-900">Users</h1>
          </div>
          <UserTable
            users={users}
            onUserClick={selectUser}
            onDeleteUser={deleteUser}
            pendingDeletes={pendingDeletes}
          />
        </div>
        {isModalOpen && selectedUser && (
          <UserDetailModal user={selectedUser} onClose={closeModal} />
        )}
        {userToDelete !== null && userToDeleteData && (
          <ConfirmDialog
            isOpen={true}
            title="Delete User"
            message={`Are you sure you want to delete ${userToDeleteData.name}? This action cannot be undone.`}
            onConfirm={confirmDelete}
            onCancel={cancelDelete}
          />
        )}
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <UserProvider>
        <AppContent />
      </UserProvider>
    </ErrorBoundary>
  );
};

export default App; 