// app/loading.jsx
'use client';

import React from 'react';
import { Atom } from 'react-loading-indicators';

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <Atom
        color="#ffffff"
        size="large"
        text="Loading..."
      />
    </div>
    
  );
}
