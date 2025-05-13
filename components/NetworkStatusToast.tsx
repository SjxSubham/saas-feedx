'use client';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { CheckCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/solid';

export default function NetworkStatusToast() {
  useEffect(() => {
    const handleOnline = () => {
      toast.success(
        <div className="flex items-center gap-2 bg-transparent">
          <CheckCircleIcon className="w-5 h-5 text-green-500" />
          <span>You're back, Online</span>
        </div>,
        { icon: null }
      );
    };

    const handleOffline = () => {
      toast.error(
        <div className="flex items-center bg-transparent gap-2">
          <ExclamationTriangleIcon className="w-5 h-5 text-red-500" />
          <span>Network Disconnected, Offline</span>
        </div>,
        { icon: null }
      );
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Show status on initial load
    if (!navigator.onLine) handleOffline();

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []); // Add dependency array to ensure the effect runs only once

  return null; // This component does not render anything visible
}