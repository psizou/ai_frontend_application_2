import React from "react";
import { User } from "../types/user";

interface UserDetailModalProps {
  user: User | null;
  onClose: () => void;
}

const UserDetailModal: React.FC<UserDetailModalProps> = ({ user, onClose }) => {
  if (!user) return null;

  const mapUrl = `https://www.google.com/maps?q=${user.address.geo.lat},${user.address.geo.lng}`;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
        <button
          className="absolute top-2 right-2 text-2xl text-gray-400 hover:text-gray-700"
          onClick={onClose}
          aria-label="Close modal"
        >
          ×
        </button>
        <h2 className="text-xl font-bold mb-1">{user.name}</h2>
        <a href={`mailto:${user.email}`} className="text-blue-600 underline mb-4 block">
          {user.email}
        </a>
        <div className="mb-2">
          <div className="font-semibold">Address</div>
          <div>
            {user.address.suite}, {user.address.street}
            <br />
            {user.address.city}, {user.address.zipcode}
          </div>
          <a href={mapUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline text-sm">
            View on map
          </a>
        </div>
        <div className="mb-2">
          <div className="font-semibold">Contact</div>
          <div>Phone: {user.phone}</div>
          <div>
            Website:{" "}
            <a href={`http://${user.website}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
              {user.website}
            </a>
          </div>
        </div>
        <div>
          <div className="font-semibold">Company</div>
          <div>Name: {user.company.name}</div>
          <div>Catchphrase: {user.company.catchPhrase}</div>
          <div>Business: {user.company.bs}</div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailModal; 