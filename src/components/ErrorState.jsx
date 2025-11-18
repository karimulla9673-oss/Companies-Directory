import React from 'react';
import { AlertCircle } from 'lucide-react';

export default function ErrorState({ message }) {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
      <h3 className="text-xl font-semibold text-gray-800 mb-2">Error Loading Data</h3>
      <p className="text-gray-600">{message}</p>
    </div>
  );
}