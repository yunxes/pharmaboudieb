import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

// Gestion des erreurs globales pour mobile
window.addEventListener('error', (event) => {
  console.error('Erreur globale:', event.error);
  // Ne pas bloquer l'application en cas d'erreur
  return true;
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('Promesse rejetée:', event.reason);
  // Ne pas bloquer l'application
  event.preventDefault();
});

// Vérifier que l'élément root existe avant de rendre
const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error('Élément root non trouvé!');
  document.body.innerHTML = '<div style="padding: 20px; text-align: center; color: red;">Erreur: Élément root non trouvé</div>';
} else {
  try {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } catch (error) {
    console.error('Erreur lors du rendu:', error);
    rootElement.innerHTML = '<div style="padding: 20px; text-align: center; color: red;">Erreur lors du chargement de l\'application</div>';
  }
}

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