import React from "react";
import { User } from "../types/user";

interface UserTableProps {
  users: User[];
  onUserClick: (user: User) => void;
  onDeleteUser: (userId: number) => void;
}

const UserTable: React.FC<UserTableProps> = ({
  users,
  onUserClick,
  onDeleteUser,
}) => {
  return (
    <div>
      {/* Table header */}
      <div className="grid grid-cols-6 font-semibold border-b py-2">
        <div>Name / Email</div>
        <div>Address</div>
        <div>Phone</div>
        <div>Website</div>
        <div>Company</div>
        <div>Action</div>
      </div>
      {/* Table rows */}
      {users.map((user) => (
        <div
          key={user.id}
          className="grid grid-cols-6 items-center border-b py-2 cursor-pointer hover:bg-gray-50"
          onClick={() => onUserClick(user)}
        >
          <div>
            <div className="font-bold">{user.name}</div>
            <div className="text-sm text-gray-500">{user.email}</div>
          </div>
          <div>
            {user.address.city}, {user.address.street}
          </div>
          <div>{user.phone}</div>
          <div>
            <a
              href={`http://${user.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              {user.website}
            </a>
          </div>
          <div>{user.company.name}</div>
          <div>
            <button
              className="text-red-500 hover:text-red-700"
              onClick={(e) => {
                e.stopPropagation();
                onDeleteUser(user.id);
              }}
              aria-label="Delete user"
            >
              ×
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserTable;
