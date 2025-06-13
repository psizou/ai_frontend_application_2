import React, { useEffect, useRef, KeyboardEvent } from 'react';
import { User } from '../../types/user';

interface UserDetailModalProps {
  user: User;
  onClose: () => void;
}

export const UserDetailModal: React.FC<UserDetailModalProps> = ({ user, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    // Focus the close button when modal opens
    closeButtonRef.current?.focus();

    // Add event listeners
    document.addEventListener('keydown', handleEscape as any);
    document.addEventListener('mousedown', handleClickOutside);

    // Prevent scrolling of the background
    document.body.style.overflow = 'hidden';

    // Store the active element to restore focus later
    const activeElement = document.activeElement;

    return () => {
      // Remove event listeners
      document.removeEventListener('keydown', handleEscape as any);
      document.removeEventListener('mousedown', handleClickOutside);

      // Restore scrolling
      document.body.style.overflow = 'unset';

      // Restore focus to the previously active element
      if (activeElement instanceof HTMLElement) {
        activeElement.focus();
      }
    };
  }, [onClose]);

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
          aria-hidden="true"
          onClick={onClose}
        />

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div
          ref={modalRef}
          className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full animate-modal"
          role="document"
        >
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                <h2
                  className="text-lg leading-6 font-medium text-gray-900 mb-4"
                  id="modal-title"
                >
                  User Details
                </h2>
                <div className="mt-2 space-y-4">
                  <div role="group" aria-labelledby="user-name-label">
                    <h3 id="user-name-label" className="text-sm font-medium text-gray-500">Name</h3>
                    <p className="mt-1 text-sm text-gray-900">{user.name}</p>
                  </div>
                  <div role="group" aria-labelledby="user-email-label">
                    <h3 id="user-email-label" className="text-sm font-medium text-gray-500">Email</h3>
                    <p className="mt-1 text-sm text-gray-900">{user.email}</p>
                  </div>
                  <div role="group" aria-labelledby="user-phone-label">
                    <h3 id="user-phone-label" className="text-sm font-medium text-gray-500">Phone</h3>
                    <p className="mt-1 text-sm text-gray-900">{user.phone}</p>
                  </div>
                  <div role="group" aria-labelledby="user-company-label">
                    <h3 id="user-company-label" className="text-sm font-medium text-gray-500">Company</h3>
                    <p className="mt-1 text-sm text-gray-900">
                      {user.company.name}
                      <br />
                      <span className="text-gray-500">{user.company.catchPhrase}</span>
                    </p>
                  </div>
                  <div role="group" aria-labelledby="user-address-label">
                    <h3 id="user-address-label" className="text-sm font-medium text-gray-500">Address</h3>
                    <p className="mt-1 text-sm text-gray-900">
                      {user.address.street}, {user.address.suite}
                      <br />
                      {user.address.city}, {user.address.zipcode}
                    </p>
                  </div>
                  <div role="group" aria-labelledby="user-website-label">
                    <h3 id="user-website-label" className="text-sm font-medium text-gray-500">Website</h3>
                    <a
                      href={`https://${user.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 text-sm text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded"
                      aria-label={`Visit ${user.name}'s website (opens in new tab)`}
                    >
                      {user.website}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              onKeyDown={handleKeyDown}
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm transition-colors"
              aria-label="Close modal"
              tabIndex={0}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}; 