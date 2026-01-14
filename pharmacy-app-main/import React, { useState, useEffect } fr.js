import React, { useState, useEffect } from 'react';
import { 
  Search, MapPin, Pill, FileText, Flask, Heart, Brain, Eye, Lung, 
  Stomach, Syringe, Droplets, Shield, AlertTriangle, Bug, Skull, 
  Headphones, Activity, User, Venus, BrainCircuit, Thermometer,
  Droplet, Ear, ActivitySquare, Bone, HeartPulse, Kidney, Baby,
  Download // <-- Ajouté pour l'icône d'installation
} from 'lucide-react';

const PharmacyApp = () => {
  // États existants
  const [mode, setMode] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState(null);
  const [dciList, setDciList] = useState([]);
  const [antibioticsList, setAntibioticsList] = useState([]);
  const [antiInflamList, setAntiInflamList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  // NOUVEAUX ÉTATS PWA
  const [isInstallable, setIsInstallable] = useState(false);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [showInstallBanner, setShowInstallBanner] = useState(false);

  // Votre base de données de médicaments (gardez tout ce que vous avez déjà)
  const medicationsCase1 = { /* ... votre code existant ... */ };
  const medicationsCase2 = { /* ... votre code existant ... */ };
  const medicationsCase3 = { /* ... votre code existant ... */ };
  const medicationsCase4 = { /* ... votre code existant ... */ };
  const medicationsCase5 = { /* ... votre code existant ... */ };
  const medicationsCase6 = { /* ... votre code existant ... */ };

  // Vos autres variables et fonctions...
  const allCases = [ /* ... */ ];
  const categories = [ /* ... */ ];

  // Effet pour gérer les fonctionnalités PWA
  useEffect(() => {
    // 1. Gérer l'invite d'installation PWA
    const handleBeforeInstallPrompt = (e) => {
      console.log('📍 beforeinstallprompt déclenché');
      e.preventDefault();
      
      // Stocker l'événement pour l'utiliser plus tard
      window.deferredPrompt = e;
      
      // Montrer le bouton d'installation
      setIsInstallable(true);
      
      // Afficher une bannière après 5 secondes si l'utilisateur n'a pas installé
      setTimeout(() => {
        if (window.deferredPrompt && !isPWAInstalled()) {
          setShowInstallBanner(true);
        }
      }, 5000);
    };

    // 2. Vérifier si l'app est déjà installée
    const checkIfPWAInstalled = () => {
      if (isPWAInstalled()) {
        setIsInstallable(false);
        setShowInstallBanner(false);
      }
    };

    // 3. Gérer le statut en ligne/hors ligne
    const handleOnline = () => {
      console.log('✅ Application en ligne');
      setIsOffline(false);
    };

    const handleOffline = () => {
      console.log('⚠️ Application hors ligne');
      setIsOffline(true);
      
      // Afficher un message pour les données en cache
      if ('caches' in window) {
        console.log('📦 Utilisation du cache pour fonctionnement hors ligne');
      }
    };

    // 4. Vérifier le stockage disponible
    const checkStorage = async () => {
      if ('storage' in navigator && 'estimate' in navigator.storage) {
        const { usage, quota } = await navigator.storage.estimate();
        console.log(`💾 Stockage utilisé: ${(usage / 1024 / 1024).toFixed(2)} MB`);
        console.log(`💾 Quota total: ${(quota / 1024 / 1024).toFixed(2)} MB`);
        
        // Avertir si l'espace est faible
        if (usage / quota > 0.9) {
          console.warn('⚠️ Espace de stockage faible');
        }
      }
    };

    // Ajouter les écouteurs d'événements
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    window.addEventListener('appinstalled', () => {
      console.log('🎉 Application installée avec succès!');
      setIsInstallable(false);
      setShowInstallBanner(false);
      
      // Analytics: suivre les installations
      if (window.gtag) {
        window.gtag('event', 'app_installed');
      }
    });

    // Vérifications initiales
    checkIfPWAInstalled();
    checkStorage();

    // Nettoyer les écouteurs
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Fonction pour vérifier si l'app est déjà installée
  const isPWAInstalled = () => {
    return window.matchMedia('(display-mode: standalone)').matches ||
           window.navigator.standalone ||
           document.referrer.includes('android-app://');
  };

  // Fonction d'installation PWA
  const handleInstall = async () => {
    try {
      console.log('🔄 Début de l\'installation...');
      
      if (!window.deferredPrompt) {
        console.warn('❌ Aucune invite d\'installation disponible');
        
        // Fallback: rediriger vers les instructions
        if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
          alert('Sur iOS: Appuyez sur le bouton de partage 📤 puis "Sur l\'écran d\'accueil"');
        } else if (/Android/i.test(navigator.userAgent)) {
          alert('Sur Android: Menu (⋮) → "Ajouter à l\'écran d\'accueil"');
        }
        return;
      }

      const installPrompt = window.deferredPrompt;
      
      // Afficher la boîte de dialogue d'installation
      await installPrompt.prompt();
      
      // Attendre le choix de l'utilisateur
      const { outcome } = await installPrompt.userChoice;
      
      console.log(`👤 Choix de l'utilisateur: ${outcome}`);
      
      if (outcome === 'accepted') {
        console.log('✅ Installation acceptée');
        setIsInstallable(false);
        setShowInstallBanner(false);
        
        // Feedback visuel
        showInstallationSuccess();
      } else {
        console.log('❌ Installation refusée');
        // Proposer à nouveau plus tard
        setTimeout(() => {
          if (!isPWAInstalled()) {
            setShowInstallBanner(true);
          }
        }, 30000); // Après 30 secondes
      }
      
      // Réinitialiser l'invite
      window.deferredPrompt = null;
      
    } catch (error) {
      console.error('💥 Erreur d\'installation:', error);
      
      // Message d'erreur convivial
      alert(`Erreur d'installation: ${error.message}. 
Essayez d'ajouter manuellement à l'écran d'accueil.`);
    }
  };

  // Fonction pour montrer un message de succès
  const showInstallationSuccess = () => {
    const successMessage = document.createElement('div');
    successMessage.className = 'fixed top-4 left-1/2 transform -translate-x-1/2 z-50';
    successMessage.innerHTML = `
      <div class="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-bounce">
        <span class="text-xl">🎉</span>
        <span>Application installée avec succès!</span>
      </div>
    `;
    document.body.appendChild(successMessage);
    
    setTimeout(() => {
      successMessage.remove();
    }, 3000);
  };

  // Fonction pour fermer la bannière
  const handleCloseBanner = () => {
    setShowInstallBanner(false);
    // Se souvenir du choix pendant 30 jours
    localStorage.setItem('installBannerClosed', Date.now());
  };

  // Vérifier si on doit montrer la bannière
  useEffect(() => {
    const lastClosed = localStorage.getItem('installBannerClosed');
    if (lastClosed) {
      const daysSinceClosed = (Date.now() - parseInt(lastClosed)) / (1000 * 60 * 60 * 24);
      if (daysSinceClosed < 30) {
        setShowInstallBanner(false);
      }
    }
  }, []);

  // Votre reste du code (findPosition, findByDCI, etc.) reste inchangé...
  const findPosition = (medName) => { /* ... */ };
  const findByDCI = (searchInput) => { /* ... */ };
  // ... toutes vos autres fonctions

  // Rendu JSX - MODIFIER LE RETURN POUR AJOUTER LES COMPOSANTS PWA
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-100 via-teal-50 to-cyan-100 p-6">
      
      {/* 🔔 Bannière d'installation PWA (en haut) */}
      {showInstallBanner && (
        <div className="fixed top-0 left-0 right-0 z-50 animate-slideDown">
          <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white p-4 shadow-lg">
            <div className="max-w-6xl mx-auto flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Pill className="w-6 h-6" />
                <div>
                  <p className="font-bold">Installer Pharmacy Boudieb</p>
                  <p className="text-sm text-emerald-100">Accès rapide depuis votre écran d'accueil</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleInstall}
                  className="bg-white text-emerald-700 px-4 py-2 rounded-lg font-semibold hover:bg-emerald-50 transition-colors"
                >
                  Installer
                </button>
                <button
                  onClick={handleCloseBanner}
                  className="text-emerald-200 hover:text-white"
                >
                  ✕
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ⚠️ Notification hors ligne */}
      {isOffline && (
        <div className="fixed top-4 left-4 right-4 z-40 animate-fadeIn">
          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-lg shadow-md max-w-md mx-auto">
            <div className="flex items-center">
              <AlertTriangle className="w-6 h-6 mr-2 flex-shrink-0" />
              <div>
                <p className="font-bold">Mode hors ligne activé</p>
                <p className="text-sm">Vous pouvez toujours rechercher dans les médicaments en cache</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto pt-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 border-t-8 border-emerald-500">
          
          {/* En-tête avec bouton d'installation flottant */}
          <div className="text-center mb-8 relative">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Pill className="w-12 h-12 text-emerald-600" />
              <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Pharmacy Boudieb
              </h1>
            </div>
            <p className="text-xl text-teal-600 font-semibold">Témouchent</p>
            <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 mx-auto mt-3 rounded-full"></div>
            
            {/* Bouton d'installation flottant (seulement si installable) */}
            {isInstallable && (
              <button
                onClick={handleInstall}
                className="absolute right-0 top-0 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition-all flex items-center gap-2 group animate-pulse"
                title="Installer l'application"
              >
                <Download className="w-5 h-5" />
                <span className="hidden sm:inline">Installer</span>
                <span className="inline sm:hidden">📱</span>
              </button>
            )}
          </div>

          {/* Badge PWA */}
          <div className="mb-6 flex justify-center">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
              <span>PWA • Fonctionne hors ligne</span>
            </div>
          </div>

          {/* Votre contenu principal reste inchangé */}
          {!mode ? (
            <div className="space-y-4">
              {/* ... vos boutons de mode existants ... */}
              
              {/* Section PWA info */}
              <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
                <div className="flex items-center gap-3 mb-2">
                  <Download className="w-6 h-6 text-blue-600" />
                  <h3 className="font-bold text-blue-800">Application mobile</h3>
                </div>
                <p className="text-sm text-blue-700 mb-3">
                  Installez cette application sur votre téléphone pour un accès rapide, même sans internet.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">
                  <div className="flex items-center gap-1">
                    <span className="text-green-600">✓</span>
                    <span>Fonctionne hors ligne</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-green-600">✓</span>
                    <span>Pas besoin d'App Store</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-green-600">✓</span>
                    <span>Mises à jour automatiques</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div>
              {/* ... votre interface de recherche existante ... */}
            </div>
          )}
        </div>
      </div>

      {/* 📱 Bouton d'installation flottant en bas à droite (mobile) */}
      {isInstallable && (
        <button
          onClick={handleInstall}
          className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all transform hover:scale-110 animate-bounce-slow flex items-center justify-center md:hidden"
          aria-label="Installer l'application"
        >
          <Download className="w-6 h-6" />
          <span className="sr-only">Installer</span>
        </button>
      )}

      {/* ℹ️ Info PWA en bas */}
      <div className="mt-8 text-center text-sm text-gray-600">
        <p>
          <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2"></span>
          PWA • Version 1.0 • {isOffline ? 'Hors ligne' : 'En ligne'}
          {isInstallable && ' • Prêt à installer'}
        </p>
      </div>
    </div>
  );
};

// Ajouter les styles CSS pour les animations
const styles = `
@keyframes slideDown {
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes bounce-slow {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.animate-slideDown {
  animation: slideDown 0.5s ease-out;
}

.animate-fadeIn {
  animation: fadeIn 0.3s ease-out;
}

.animate-bounce-slow {
  animation: bounce-slow 2s infinite;
}
`;

// Injecter les styles
const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default PharmacyApp;