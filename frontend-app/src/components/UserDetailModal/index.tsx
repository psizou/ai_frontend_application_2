import React from 'react';
import { User } from '../../types/user';

interface UserDetailModalProps {
  user: User;
  onClose: () => void;
}

export const UserDetailModal: React.FC<UserDetailModalProps> = ({ user, onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3">
          <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">User Details</h3>
          <div className="mt-2 px-7 py-3">
            <div className="mb-4">
              <p className="text-sm text-gray-500">Name</p>
              <p className="text-base font-medium">{user.name}</p>
            </div>
            <div className="mb-4">
              <p className="text-sm text-gray-500">Email</p>
              <p className="text-base font-medium">{user.email}</p>
            </div>
            <div className="mb-4">
              <p className="text-sm text-gray-500">Phone</p>
              <p className="text-base font-medium">{user.phone}</p>
            </div>
            <div className="mb-4">
              <p className="text-sm text-gray-500">Company</p>
              <p className="text-base font-medium">{user.company.name}</p>
            </div>
            <div className="mb-4">
              <p className="text-sm text-gray-500">Address</p>
              <p className="text-base font-medium">
                {user.address.street}, {user.address.suite}
                <br />
                {user.address.city}, {user.address.zipcode}
              </p>
            </div>
          </div>
          <div className="items-center px-4 py-3">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};