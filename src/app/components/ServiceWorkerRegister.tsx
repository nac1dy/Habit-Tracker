'use client';

import { useEffect } from 'react';

export default function ServiceWorkerRegister() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
        navigator.serviceWorker
            .register("/service-worker.js")
            .then(() => console.log("Service Worker registered successfully"))
            .catch((error) => console.error("Error registering Service Worker:", error));
    }
  }, []);

  return null; // This component doesn't render anything
}