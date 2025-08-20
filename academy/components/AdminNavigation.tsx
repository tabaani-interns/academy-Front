import React from "react";

const AdminNavigation = () => {
  return (
    <div className="flex justify-center py-8">
      <div className="flex space-x-4">
        <button className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
          Admin Dashboard
        </button>
        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Manage Courses
        </button>
        <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
          View Analytics
        </button>
      </div>
    </div>
  );
};

export default AdminNavigation;
