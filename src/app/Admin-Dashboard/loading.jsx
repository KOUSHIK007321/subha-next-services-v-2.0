// app/loading.jsx
'use client';

import React from 'react';
import { Atom } from 'react-loading-indicators';

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white-900">
      <Atom
        color="#000000"
        size="large"
        text="Loading..."
      />
    </div>
  );
}
