import React from 'react';
import { Atom } from 'react-loading-indicators';

export default function pageLoading({ color = '#ffffff', size = 'large', text = '' }) {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <Atom
                color={color}
                size={size}
                text={text}
            />
        </div>
    );
}
