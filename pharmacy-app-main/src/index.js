import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Enregistrer le service worker
serviceWorkerRegistration.register({
  onSuccess: () => console.log('Service Worker enregistré avec succès'),
  onUpdate: (registration) => {
    console.log('Nouveau Service Worker disponible');
    
    // Notification de mise à jour
    if (window.confirm('Nouvelle version disponible ! Voulez-vous recharger ?')) {
      registration.waiting.postMessage({ type: 'SKIP_WAITING' });
      window.location.reload();
    }
  },
});