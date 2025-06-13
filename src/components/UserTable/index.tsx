import React, { KeyboardEvent } from 'react';
import { User } from '../../types/user';

interface UserTableProps {
  users: User[];
  onUserClick: (userId: number) => void;
  onDeleteUser: (userId: number) => void;
  pendingDeletes: number[];
}

export const UserTable: React.FC<UserTableProps> = ({
  users,
  onUserClick,
  onDeleteUser,
  pendingDeletes,
}) => {
  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>, action: () => void) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      action();
    }
  };

  return (
    <div className="overflow-x-auto" role="region" aria-label="Users list">
      <table
        className="min-w-full divide-y divide-gray-200"
        role="grid"
        aria-label="Users table"
      >
        <thead className="bg-gray-50">
          <tr role="row">
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              role="columnheader"
            >
              Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              role="columnheader"
            >
              Email
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              role="columnheader"
            >
              Company
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              role="columnheader"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user) => {
            const isPending = pendingDeletes.includes(user.id);
            return (
              <tr
                key={user.id}
                className={`transition-colors duration-150 ease-in-out ${
                  isPending ? 'opacity-50 bg-gray-50' : 'hover:bg-gray-50'
                }`}
                role="row"
              >
                <td className="px-6 py-4 whitespace-nowrap" role="gridcell">
                  <div className="flex items-center">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{user.name}</div>
                      <div className="text-sm text-gray-500" aria-label={`Username: ${user.username}`}>
                        @{user.username}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap" role="gridcell">
                  <div className="text-sm text-gray-900">{user.email}</div>
                  <div className="text-sm text-gray-500">{user.phone}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap" role="gridcell">
                  <div className="text-sm text-gray-900">{user.company.name}</div>
                  <div className="text-sm text-gray-500">{user.company.catchPhrase}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium" role="gridcell">
                  <button
                    onClick={() => onUserClick(user.id)}
                    onKeyDown={(e) => handleKeyDown(e, () => onUserClick(user.id))}
                    className="text-indigo-600 hover:text-indigo-900 mr-4 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label={`View details for ${user.name}`}
                    tabIndex={0}
                    disabled={isPending}
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => onDeleteUser(user.id)}
                    onKeyDown={(e) => handleKeyDown(e, () => onDeleteUser(user.id))}
                    className="text-red-600 hover:text-red-900 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label={`Delete ${user.name}`}
                    tabIndex={0}
                    disabled={isPending}
                  >
                    {isPending ? 'Deleting...' : 'Delete'}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {users.length === 0 && (
        <div className="text-center py-8" role="status" aria-live="polite">
          <p className="text-gray-500 text-sm">No users found</p>
        </div>
      )}
    </div>
  );
}; 