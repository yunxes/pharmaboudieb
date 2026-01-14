// Vérifier si l'application est installée
export const isAppInstalled = () => {
  return window.matchMedia('(display-mode: standalone)').matches ||
         window.navigator.standalone ||
         document.referrer.includes('android-app://');
};

// Demander l'installation
export const installApp = () => {
  const installPrompt = window.deferredPrompt;
  
  if (!installPrompt) {
    return Promise.reject(new Error('Aucune invite d\'installation disponible'));
  }
  
  return installPrompt.prompt().then(() => {
    return installPrompt.userChoice.then((choiceResult) => {
      window.deferredPrompt = null;
      return choiceResult.outcome === 'accepted';
    });
  });
};

// Vérifier si l'app peut être installée
export const canInstallApp = () => {
  return window.deferredPrompt !== undefined;
};

// Vérifier si hors ligne
export const isOffline = () => {
  return !navigator.onLine;
};

// Synchroniser les données (pour fonctionnalités futures)
export const syncData = () => {
  if ('serviceWorker' in navigator && 'SyncManager' in window) {
    navigator.serviceWorker.ready.then((registration) => {
      return registration.sync.register('sync-data');
    });
  }
};