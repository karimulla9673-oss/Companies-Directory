import React from 'react';
import { Building2 } from 'lucide-react';

export default function NoResults() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <Building2 className="w-16 h-16 text-gray-400 mb-4" />
      <h3 className="text-xl font-semibold text-gray-800 mb-2">No Companies Found</h3>
      <p className="text-gray-600">Try adjusting your filters to see more results.</p>
    </div>
  );
}