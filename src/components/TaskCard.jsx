import React, { useState } from 'react';

// Task Card Component
export const TaskCard = ({ task }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'To Do':
        return 'bg-gray-200 text-gray-800';
      case 'In Progress':
        return 'bg-blue-200 text-blue-800';
      case 'Completed':
        return 'bg-green-200 text-green-800';
      default:
        return 'bg-gray-200 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col hover:shadow-lg transition-shadow text-left h-fit mb-5">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-gray-900 flex-1 pr-2">
          {task.title}
        </h3>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
          {task.status}
        </span>
      </div>
      
      {task.description && (
        <p className="text-gray-600 text-sm mb-4 flex-1">
          {task.description}
        </p>
      )}
      
      <div className="text-xs text-gray-500 mt-auto">
        Due: {formatDate(task.due_date)}
      </div>
    </div>
  );
};