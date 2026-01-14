import React, { useState, useEffect } from 'react';
import './App.css';
import { 
  Search, MapPin, Pill, FileText, Download, AlertTriangle,
  FlaskConical, Shield, Bug, Skull,
  Thermometer, Headphones, Activity, Heart, Droplet,
  ActivitySquare, Eye, Bone, Brain, BrainCircuit,
  Syringe, HeartPulse, Wind
} from 'lucide-react';

const PharmacyApp = () => {
  const [mode, setMode] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState(null);
  const [dciList, setDciList] = useState([]);
  const [antibioticsList, setAntibioticsList] = useState([]);
  const [antiInflamList, setAntiInflamList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isInstallable, setIsInstallable] = useState(false);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [showInstallBanner, setShowInstallBanner] = useState(false);
  
  // Case 1 - Médicaments organisés par ligne et colonne (déjà dans votre code)
  const medicationsCase1 = {
    ligne1: {
      colonne1: [
        { nom: "Ciprolon", forme: "comprimés", dosages: ["250 mg", "500 mg"], dci: "ciprofloxacine", categories: ["ANTIBIOTIQUES"] },
        { nom: "Lexin", forme: "sachets", dosages: ["1000 mg", "500 mg"], dci: "cefalexine", categories: ["ANTIBIOTIQUES"] },
        { nom: "Dolidol", forme: "comprimés effervescents", dosages: ["Vitamine C 500 mg + Paracetamol 250 mg"], dci: "paracetamol", categories: ["ANTALGIQUES"] },
        { nom: "Upsa Vitamine C", forme: "effervescent", dosages: ["100 mg"], dci: "acide ascorbique", categories: ["METABOLISME"] },
        { nom: "Melaza", forme: "suppositoires", dosages: ["500 mg"], dci: "paracetamol", categories: ["ANTALGIQUES"] },
        { nom: "Upsa Effiralgan", forme: "vitamine C", dosages: ["500 mg PR + 200 mg acide ascorbique"], dci: "paracetamol", categories: ["ANTALGIQUES"] },
        { nom: "Efferalgan", forme: "comprimés", dosages: ["1000 mg"], dci: "paracetamol", categories: ["ANTALGIQUES"] },
        { nom: "Cedroc", forme: "comprimés", dosages: ["1g"], dci: "cefradine", categories: ["ANTIBIOTIQUES"] },
        { nom: "Vogalon", forme: "suppositoires", dosages: ["5 mg", "2.5 mg"], dci: "metopimazine", categories: ["GASTROLOGIE"] },
        { nom: "Dolidol Flash", forme: "comprimés effervescents", dosages: ["1000 mg"], dci: "paracetamol", categories: ["ANTALGIQUES"] },
        { nom: "Melaz", forme: "suppositoires", dosages: ["1g"], dci: "paracetamol", categories: ["ANTALGIQUES"] },
        { nom: "Painoxam", forme: "suppositoires", dosages: ["20 mg"], dci: "piroxicam", categories: ["ANTI-INFLAMMATOIRES", "RHUMATOLOGIE"] }
      ],
      colonne2: [
        { nom: "Niflumene", forme: "suppositoires", dosages: ["200 mg", "400 mg", "700 mg"], dci: "acide niflumique", categories: ["ANTI-INFLAMMATOIRES"] },
        { nom: "Digestat", forme: "suppositoires", dosages: ["100 mg"], dci: "bisacodyl", categories: ["GASTROLOGIE"] },
        { nom: "Camphobiotic Enfants", forme: "suppositoires", dosages: [], dci: "camphre", categories: ["ANTIBIOTIQUES"] },
        { nom: "Spasmol", forme: "suppositoires", dosages: ["150 mg"], dci: "tiemonium", categories: ["GASTROLOGIE"] },
        { nom: "Alprofene", forme: "suppositoires adulte", dosages: ["100 mg"], dci: "ketoprofene", categories: ["ANTI-INFLAMMATOIRES"] },
        { nom: "Biofenac", forme: "suppositoires", dosages: ["100 mg"], dci: "diclofenac", categories: ["ANTI-INFLAMMATOIRES"] },
        { nom: "Clofenal", forme: "suppositoires adulte", dosages: ["100 mg"], dci: "diclofenac", categories: ["ANTI-INFLAMMATOIRES"] },
        { nom: "Profenid", forme: "suppositoires", dosages: ["100 mg"], dci: "ketoprofene", categories: ["ANTI-INFLAMMATOIRES"] },
        { nom: "Proctolon", forme: "suppositoires adulte", dosages: ["120/10 mg"], dci: "prednisolone", categories: ["ANTI-INFLAMMATOIRES"] },
        { nom: "Digestat", forme: "suppositoires adulte", dosages: ["100 mg"], dci: "bisacodyl", categories: ["GASTROLOGIE"] },
        { nom: "Curacné", forme: "capsules molles", dosages: ["10 mg"], dci: "isotretinoine", categories: ["DERMATOLOGIE"] }
      ],
      colonne3: [
        { nom: "Doliprane", forme: "suppositoires", dosages: ["100 mg"], dci: "paracetamol", age: "3-8 kg", categories: ["ANTALGIQUES"] },
        { nom: "Parol", forme: "suppositoires", dosages: ["100 mg"], dci: "paracetamol", age: "3-8 kg", categories: ["ANTALGIQUES"] },
        { nom: "Doliprane", forme: "suppositoires", dosages: ["150 mg"], dci: "paracetamol", age: "8-12 kg", categories: ["ANTALGIQUES"] },
        { nom: "Parol", forme: "suppositoires", dosages: ["150 mg"], dci: "paracetamol", age: "8-12 kg", categories: ["ANTALGIQUES"] },
        { nom: "Parol", forme: "suppositoires", dosages: ["200 mg"], dci: "paracetamol", age: "12-16 kg", categories: ["ANTALGIQUES"] },
        { nom: "Doliprane", forme: "suppositoires", dosages: ["200 mg"], dci: "paracetamol", categories: ["ANTALGIQUES"] },
        { nom: "Doliprane", forme: "suppositoires", dosages: ["300 mg"], dci: "paracetamol", categories: ["ANTALGIQUES"] },
        { nom: "Sapramol", forme: "sachet", dosages: ["150 mg", "200 mg", "300 mg", "500 mg"], dci: "paracetamol", categories: ["ANTALGIQUES"] },
        { nom: "Isomedine", forme: "solution externe", dosages: ["50 ml"], dci: "povidone iodee", categories: ["ANTISEPTIQUES"] },
        { nom: "Phelyse", forme: "gouttes", dosages: ["10 ml"], dci: "phenylephrine", categories: ["OPHTALMOLOGIE"] },
        { nom: "Somacoline", forme: "gouttes", dosages: ["100 mg"], dci: "phloroglucinol", categories: ["GASTROLOGIE"] },
        { nom: "Cicolina", forme: "solution buvable", dosages: ["0.1 g"], dci: "cetirizine", categories: ["ALLERGOLOGIE"] }
      ],
      colonne4: [
        { nom: "Cerulyse", forme: "solution auriculaire", dosages: ["100/5"], dci: "paradichlorobenzene", categories: ["OTOLOGIE"] },
        { nom: "Orilyse", forme: "solution auriculaire", dosages: ["10 ml 0.5%"], dci: "paradichlorobenzene", categories: ["OTOLOGIE"] },
        { nom: "Normalax", forme: "gel rectal", dosages: ["0.12 g"], dci: "sodium docusate", categories: ["GASTROLOGIE"] },
        { nom: "Doxalax", forme: "gel rectal", dosages: ["10 g"], dci: "sodium docusate", categories: ["GASTROLOGIE"] },
        { nom: "Prolax", forme: "sachets", dosages: ["10 g"], dci: "macrogol", categories: ["GASTROLOGIE"] },
        { nom: "Forlax", forme: "sachets", dosages: ["4g", "10 g"], dci: "macrogol", categories: ["GASTROLOGIE"] },
        { nom: "Fortrans", forme: "sachets", dosages: [], dci: "macrogol", categories: ["GASTROLOGIE"] },
        { nom: "Bedelix", forme: "sachets", dosages: ["3g"], dci: "montmorillonite", categories: ["GASTROLOGIE"] },
        { nom: "Smecta Fraise", forme: "sachets", dosages: ["3 g"], dci: "diosmectite", categories: ["GASTROLOGIE"] },
        { nom: "Smecta", forme: "sachets", dosages: ["3g"], dci: "diosmectite", categories: ["GASTROLOGIE"] },
        { nom: "Smedyl", forme: "sachets", dosages: ["3g"], dci: "diosmectite", categories: ["GASTROLOGIE"] }
      ]
    },
    ligne2: {
      colonne1: [
        { nom: "Ciprofloxacine", forme: "comprimés", dosages: ["500 mg"], dci: "ciprofloxacine", categories: ["ANTIBIOTIQUES"] },
        { nom: "Ciprodar", forme: "comprimés", dosages: ["500 mg"], dci: "ciprofloxacine", categories: ["ANTIBIOTIQUES"] },
        { nom: "Quinoc", forme: "comprimés", dosages: ["500 mg"], dci: "ciprofloxacine", categories: ["ANTIBIOTIQUES"] },
        { nom: "Cipro", forme: "comprimés", dosages: ["500 mg"], dci: "ciprofloxacine", categories: ["ANTIBIOTIQUES"] },
        { nom: "Levoflox", forme: "comprimés", dosages: ["500 mg"], dci: "levofloxacine", categories: ["ANTIBIOTIQUES"] },
        { nom: "Loxamox", forme: "comprimés", dosages: ["500 mg"], dci: "amoxicilline", categories: ["ANTIBIOTIQUES"] },
        { nom: "Lexin", forme: "gélules", dosages: ["500 mg", "1000 mg"], dci: "cefalexine", categories: ["ANTIBIOTIQUES"] },
        { nom: "Lexinal", forme: "comprimé", dosages: ["1g"], dci: "cefalexine", categories: ["ANTIBIOTIQUES"] },
        { nom: "Ancéfal", forme: "comprimés", dosages: ["1g"], dci: "cefadroxil", categories: ["ANTIBIOTIQUES"] },
        { nom: "Augmentin", forme: "sachet", dosages: ["1g/125 mg"], dci: "amoxicilline clavulanate", categories: ["ANTIBIOTIQUES"] },
        { nom: "Amoclan", forme: "sachet", dosages: ["1g", "500 mg"], dci: "amoxicilline clavulanate", categories: ["ANTIBIOTIQUES"] },
        { nom: "Amoclan", forme: "comprimés", dosages: ["1g"], dci: "amoxicilline clavulanate", categories: ["ANTIBIOTIQUES"] },
        { nom: "Bioclav", forme: "sachet", dosages: ["500 mg"], dci: "amoxicilline clavulanate", categories: ["ANTIBIOTIQUES"] },
        { nom: "Bioclav", forme: "comprimés", dosages: ["500 mg"], dci: "amoxicilline clavulanate", categories: ["ANTIBIOTIQUES"] },
        { nom: "Amoxypen", forme: "comprimés dispersibles", dosages: ["1g"], dci: "amoxicilline", categories: ["ANTIBIOTIQUES"] },
        { nom: "Biopamox", forme: "sachet", dosages: ["1g"], dci: "amoxicilline", categories: ["ANTIBIOTIQUES"] },
        { nom: "Precortyl", forme: "comprimés", dosages: ["20 mg"], dci: "prednisolone", categories: ["ANTI-INFLAMMATOIRES"] },
        { nom: "Spiramynal", forme: "comprimés", dosages: ["1.5", "3"], dci: "spiramycine", categories: ["ANTIBIOTIQUES"] },
        { nom: "Spiracare", forme: "comprimés", dosages: ["3"], dci: "spiramycine", categories: ["ANTIBIOTIQUES"] },
        { nom: "Biopamox", forme: "gélules", dosages: ["500 mg"], dci: "amoxicilline", categories: ["ANTIBIOTIQUES"] },
        { nom: "Precortyl", forme: "comprimés", dosages: ["5 mg"], dci: "prednisolone", categories: ["ANTI-INFLAMMATOIRES"] }
      ],
      colonne2: [
        { nom: "Vircet", forme: "gélules", dosages: ["50 mg", "100 mg", "200 mg"], dci: "aciclovir", categories: ["ANTIVIRAUX"] },
        { nom: "Prédnisolone", forme: "comprimés", dosages: ["20 mg"], dci: "prednisolone", categories: ["ANTI-INFLAMMATOIRES"] },
        { nom: "Dotur", forme: "comprimés", dosages: ["100 mg"], dci: "doxycycline", categories: ["ANTIBIOTIQUES"] },
        { nom: "Mycozan", forme: "", dosages: [], dci: "miconazole", categories: ["ANTIFONGIQUES"] },
        { nom: "Fluconale", forme: "comprimé", dosages: ["150", "50 mg"], dci: "fluconazole", categories: ["ANTIFONGIQUES"] },
        { nom: "Lomazel", forme: "gélules", dosages: ["50 mg"], dci: "fluconazole", categories: ["ANTIFONGIQUES"] },
        { nom: "Fluconazole", forme: "gélules", dosages: ["50 mg"], dci: "fluconazole", categories: ["ANTIFONGIQUES"] },
        { nom: "Supremase", forme: "comprimés", dosages: ["150 mg"], dci: "fluconazole", categories: ["ANTIFONGIQUES"] },
        { nom: "Flukas", forme: "gélules", dosages: ["150 mg"], dci: "fluconazole", categories: ["ANTIFONGIQUES"] },
        { nom: "Flucazole", forme: "gélules", dosages: ["150 mg"], dci: "fluconazole", categories: ["ANTIFONGIQUES"] },
        { nom: "Amikoz", forme: "comprimés", dosages: ["50 mg"], dci: "fluconazole", categories: ["ANTIFONGIQUES"] },
        { nom: "Predo", forme: "voie orale", dosages: ["5 ml"], dci: "prednisolone", categories: ["ANTI-INFLAMMATOIRES"] },
        { nom: "Physiolone", forme: "voie orale", dosages: ["1mg/ml"], dci: "prednisolone", categories: ["ANTI-INFLAMMATOIRES"] },
        { nom: "Prednal", forme: "comprimés", dosages: ["20 mg"], dci: "prednisolone", categories: ["ANTI-INFLAMMATOIRES"] },
        { nom: "Oropred", forme: "comprimés", dosages: ["20", "5 mg"], dci: "prednisolone", categories: ["ANTI-INFLAMMATOIRES"] },
        { nom: "Deprisole", forme: "voie orale comprimé", dosages: ["20", "5 mg"], dci: "prednisolone", categories: ["ANTI-INFLAMMATOIRES"] },
        { nom: "Histagan", forme: "comprimé", dosages: ["2 mg"], dci: "cyproheptadine", categories: ["ALLERGOLOGIE"] }
      ],
      colonne3: [
        { nom: "Tifen", forme: "comprimés", dosages: ["1 mg"], dci: "ketotifene", categories: ["ALLERGOLOGIE"] },
        { nom: "Rifex", forme: "comprimé", dosages: ["180 mg"], dci: "fexofenadine", categories: ["ALLERGOLOGIE"] },
        { nom: "Ropad", forme: "comprimés", dosages: ["10 mg"], dci: "loratadine", categories: ["ALLERGOLOGIE"] },
        { nom: "Telfast", forme: "comprimés", dosages: ["120 mg"], dci: "fexofenadine", categories: ["ALLERGOLOGIE"] },
        { nom: "Sulpidal", forme: "gélules", dosages: ["50 mg"], dci: "sulpiride", categories: ["PSYCHIATRIE"] },
        { nom: "Akaryd", forme: "comprimés", dosages: ["10 mg"], dci: "loratadine", categories: ["ALLERGOLOGIE"] },
        { nom: "Sulpiren", forme: "gélules", dosages: ["50 mg"], dci: "sulpiride", categories: ["PSYCHIATRIE"] },
        { nom: "Sulpiride", forme: "gélules", dosages: ["50 mg"], dci: "sulpiride", categories: ["PSYCHIATRIE"] },
        { nom: "Fexofenadine", forme: "comprimés", dosages: ["180", "120 mg"], dci: "fexofenadine", categories: ["ALLERGOLOGIE"] },
        { nom: "Totinal", forme: "comprimé", dosages: ["1mg"], dci: "ketotifene", categories: ["ALLERGOLOGIE"] },
        { nom: "Musclax", forme: "comprimés", dosages: ["500 mg"], dci: "thiocolchicoside", categories: ["RHUMATOLOGIE"] },
        { nom: "Tirlor", forme: "comprimés", dosages: ["10 mg"], dci: "loratadine", categories: ["ALLERGOLOGIE"] },
        { nom: "Loratadine", forme: "compréme", dosages: ["10 mg"], dci: "loratadine", categories: ["ALLERGOLOGIE"] },
        { nom: "Loradine", forme: "compromés", dosages: ["10 mg"], dci: "loratadine", categories: ["ALLERGOLOGIE"] },
        { nom: "Restamine", forme: "comprimés", dosages: ["10 mg"], dci: "loratadine", categories: ["ALLERGOLOGIE"] },
        { nom: "Emadis", forme: "comprimés", dosages: ["125", "80 mg"], dci: "trimebutine", categories: ["GASTROLOGIE"] },
        { nom: "Ribal", forme: "comprimés", dosages: ["30 mg"], dci: "trimebutine", categories: ["GASTROLOGIE"] },
        { nom: "Neurovit", forme: "comprimés", dosages: ["250 mg"], dci: "vitamines b", categories: ["NEUROLOGIE", "METABOLISME"] },
        { nom: "Relaxan", forme: "comprimé", dosages: ["4mg"], dci: "thiocolchicoside", categories: ["RHUMATOLOGIE"] },
        { nom: "Inicox", forme: "gélules", dosages: ["200 mg"], dci: "celecoxib", categories: ["ANTI-INFLAMMATOIRES", "RHUMATOLOGIE"] },
        { nom: "Coxitab", forme: "gélules", dosages: ["200 mg"], dci: "celecoxib", categories: ["ANTI-INFLAMMATOIRES", "RHUMATOLOGIE"] },
        { nom: "Vitazyme", forme: "comprimés", dosages: ["250 mg"], dci: "vitamines b", categories: ["METABOLISME"] },
        { nom: "Celecoxib", forme: "gélules", dosages: ["100 mg"], dci: "celecoxib", categories: ["ANTI-INFLAMMATOIRES", "RHUMATOLOGIE"] },
        { nom: "Celebrex", forme: "gélules", dosages: ["100 mg"], dci: "celecoxib", categories: ["ANTI-INFLAMMATOIRES", "RHUMATOLOGIE"] },
        { nom: "Etofan", forme: "comprimés", dosages: ["60 mg"], dci: "etoricoxib", categories: ["ANTI-INFLAMMATOIRES", "RHUMATOLOGIE"] },
        { nom: "Cebrex", forme: "gélules", dosages: ["200 mg"], dci: "celecoxib", categories: ["ANTI-INFLAMMATOIRES", "RHUMATOLOGIE"] },
        { nom: "Celvex", forme: "gélules", dosages: ["200 mg"], dci: "celecoxib", categories: ["ANTI-INFLAMMATOIRES", "RHUMATOLOGIE"] },
        { nom: "Celecox", forme: "gélules", dosages: ["100 mg"], dci: "celecoxib", categories: ["ANTI-INFLAMMATOIRES", "RHUMATOLOGIE"] },
        { nom: "Celebrex", forme: "gélules", dosages: ["200 mg"], dci: "celecoxib", categories: ["ANTI-INFLAMMATOIRES", "RHUMATOLOGIE"] },
        { nom: "Coxibrex", forme: "gélules", dosages: ["200 mg"], dci: "celecoxib", categories: ["ANTI-INFLAMMATOIRES", "RHUMATOLOGIE"] }
      ],
      colonne4: [
        { nom: "Molisidomine", forme: "comprimé", dosages: ["2mg", "4"], dci: "molsidomine", categories: ["CARDIOLOGIE"] },
        { nom: "Mantixa", forme: "comprimé", dosages: ["4 mg"], dci: "molsidomine", categories: ["CARDIOLOGIE"] },
        { nom: "Vazotek", forme: "comprimés", dosages: ["4 mg"], dci: "molsidomine", categories: ["CARDIOLOGIE"] },
        { nom: "Diaphag", forme: "comprimé", dosages: ["80 mg"], dci: "gliclazide", categories: ["METABOLISME"] },
        { nom: "Diamicron", forme: "comprimés", dosages: ["30 mg"], dci: "gliclazide", categories: ["METABOLISME"] },
        { nom: "Physiophormine", forme: "comprimés", dosages: ["850 mg"], dci: "metformine", categories: ["METABOLISME"] },
        { nom: "Tetracne", forme: "comprimé", dosages: ["80 mg"], dci: "gliclazide", categories: ["METABOLISME"] },
        { nom: "Glurrnor", forme: "comprimé", dosages: ["30 mg"], dci: "gliclazide", categories: ["METABOLISME"] },
        { nom: "Methotrexat", forme: "comprimé", dosages: ["2.5"], dci: "methotrexate", categories: ["RHUMATOLOGIE"] },
        { nom: "Diamicron", forme: "comprimé", dosages: ["60 mg"], dci: "gliclazide", categories: ["METABOLISME"] },
        { nom: "Glucophage", forme: "comprimés", dosages: ["500", "850 mg"], dci: "metformine", categories: ["METABOLISME"] },
        { nom: "Novoformine", forme: "comprimés", dosages: ["500", "850 mg"], dci: "metformine", categories: ["METABOLISME"] },
        { nom: "Physiophormine", forme: "comprimés", dosages: ["500 mg"], dci: "metformine", categories: ["METABOLISME"] },
        { nom: "Sitagliptin", forme: "comprimés", dosages: ["50", "100 mg"], dci: "sitagliptine", categories: ["METABOLISME"] },
        { nom: "Diabestrol", forme: "sachets", dosages: ["3 g"], dci: "acarbose", categories: ["METABOLISME"] },
        { nom: "Piramyl", forme: "comprimé", dosages: ["4", "2", "3mg"], dci: "glimepiride", categories: ["METABOLISME"] },
        { nom: "Stagid", forme: "comprimé", dosages: ["700 mg"], dci: "metformine", categories: ["METABOLISME"] },
        { nom: "Irys", forme: "comprimés", dosages: ["4", "3", "2", "6 mg"], dci: "glimepiride", categories: ["METABOLISME"] },
        { nom: "Dalvex", forme: "", dosages: ["100 mg"], dci: "sitagliptine", categories: ["METABOLISME"] },
        { nom: "Diaguanid", forme: "comprimé", dosages: ["1000 mg"], dci: "metformine", categories: ["METABOLISME"] },
        { nom: "Glycenorm", forme: "comprimés", dosages: ["2 mg"], dci: "glibenclamide", categories: ["METABOLISME"] },
        { nom: "Physiophormine", forme: "comprimé", dosages: ["850 mg"], dci: "metformine", categories: ["METABOLISME"] },
        { nom: "Diaglinide", forme: "comprimés", dosages: ["1", "0.5", "2 mg"], dci: "repaglinide", categories: ["METABOLISME"] }
      ]
    },
    ligne3: {
      colonne1: [
        { nom: "Voltum", forme: "comprimés", dosages: ["25 mg"], dci: "diclofenac", categories: ["ANTI-INFLAMMATOIRES", "RHUMATOLOGIE"] },
        { nom: "Clofenal", forme: "comprimés", dosages: ["50 mg"], dci: "diclofenac", categories: ["ANTI-INFLAMMATOIRES", "RHUMATOLOGIE"] },
        { nom: "Biofenac", forme: "comprimés", dosages: ["50", "100 mg"], dci: "diclofenac", categories: ["ANTI-INFLAMMATOIRES", "RHUMATOLOGIE"] },
        { nom: "Diclofast", forme: "comprimés", dosages: ["50 mg"], dci: "diclofenac", categories: ["ANTI-INFLAMMATOIRES", "RHUMATOLOGIE"] },
        { nom: "Votrex", forme: "comprimés", dosages: ["100 mg"], dci: "diclofenac", categories: ["ANTI-INFLAMMATOIRES", "RHUMATOLOGIE"] },
        { nom: "Rapidus", forme: "comprimés", dosages: ["50 mg"], dci: "diclofenac", categories: ["ANTI-INFLAMMATOIRES", "RHUMATOLOGIE"] },
        { nom: "Diclogesic", forme: "comprimés", dosages: ["50 mg"], dci: "diclofenac", categories: ["ANTI-INFLAMMATOIRES", "RHUMATOLOGIE"] },
        { nom: "Efirap", forme: "comprimés", dosages: ["50 mg"], dci: "diclofenac", categories: ["ANTI-INFLAMMATOIRES", "RHUMATOLOGIE"] },
        { nom: "Flovenac", forme: "gélules", dosages: ["50", "75 mg"], dci: "diclofenac", categories: ["ANTI-INFLAMMATOIRES", "RHUMATOLOGIE"] },
        { nom: "Diclorene", forme: "comprimés", dosages: ["75 mg"], dci: "diclofenac", categories: ["ANTI-INFLAMMATOIRES", "RHUMATOLOGIE"] },
        { nom: "Divido", forme: "gélules", dosages: ["75 mg"], dci: "diclofenac", categories: ["ANTI-INFLAMMATOIRES", "RHUMATOLOGIE"] },
        { nom: "Ibuprofal", forme: "comprimés", dosages: ["400 mg"], dci: "ibuprofene", categories: ["ANTI-INFLAMMATOIRES", "ANTALGIQUES"] },
        { nom: "Xydol", forme: "comprimé", dosages: ["400", "200", "600 mg"], dci: "ibuprofene", categories: ["ANTI-INFLAMMATOIRES", "ANTALGIQUES"] },
        { nom: "Antalfen", forme: "comprimés", dosages: ["600 mg"], dci: "ibuprofene", categories: ["ANTI-INFLAMMATOIRES", "ANTALGIQUES"] },
        { nom: "Ibuprofal", forme: "comprimés", dosages: ["600 mg"], dci: "ibuprofene", categories: ["ANTI-INFLAMMATOIRES", "ANTALGIQUES"] },
        { nom: "Ibuprofèns", forme: "comprimés", dosages: ["600 mg"], dci: "ibuprofene", categories: ["ANTI-INFLAMMATOIRES", "ANTALGIQUES"] }
      ],
      colonne2: [
        { nom: "Betacrovis", forme: "solution orale", dosages: ["0.05%"], dci: "betamethasone", categories: ["ANTI-INFLAMMATOIRES"] },
        { nom: "Betamethasone", forme: "solution buvable en gouttes", dosages: ["0.05%"], dci: "betamethasone", categories: ["ANTI-INFLAMMATOIRES"] },
        { nom: "Célétasone", forme: "solution buvable en gouttes", dosages: ["0.05%"], dci: "betamethasone", categories: ["ANTI-INFLAMMATOIRES"] },
        { nom: "Narufene", forme: "comprimés", dosages: ["600 mg"], dci: "ibuprofene", categories: ["ANTI-INFLAMMATOIRES", "ANTALGIQUES"] },
        { nom: "Tabeta", forme: "solution buvable", dosages: ["0.5 ml"], dci: "betamethasone", categories: ["ANTI-INFLAMMATOIRES"] },
        { nom: "Nopain", forme: "comprimés", dosages: ["550", "275 mg"], dci: "naproxene", categories: ["ANTI-INFLAMMATOIRES", "ANTALGIQUES"] },
        { nom: "Naprolgic", forme: "voie orale", dosages: ["275 mg"], dci: "naproxene", categories: ["ANTI-INFLAMMATOIRES", "ANTALGIQUES"] },
        { nom: "Panadol Extra", forme: "comprimés", dosages: ["500 mg"], dci: "paracetamol", categories: ["ANTALGIQUES"] },
        { nom: "Paralgan", forme: "comprimés", dosages: ["500", "1000 mg"], dci: "paracetamol", categories: ["ANTALGIQUES"] },
        { nom: "Dolyc", forme: "comprimés", dosages: ["500", "1000 mg"], dci: "paracetamol", categories: ["ANTALGIQUES"] },
        { nom: "Paracétamol", forme: "comprimés", dosages: ["500 mg"], dci: "paracetamol", categories: ["ANTALGIQUES"] },
        { nom: "Doliprane", forme: "comprimés", dosages: ["1000", "500 mg"], dci: "paracetamol", categories: ["ANTALGIQUES"] },
        { nom: "Expanadol", forme: "comprimés", dosages: ["1000 mg"], dci: "paracetamol", categories: ["ANTALGIQUES"] },
        { nom: "Paracetal", forme: "comprimés", dosages: ["500 mg"], dci: "paracetamol", categories: ["ANTALGIQUES"] },
        { nom: "Paramol", forme: "comprimés", dosages: ["1000 mg"], dci: "paracetamol", categories: ["ANTALGIQUES"] }
      ],
      colonne3: [
        { nom: "Dysentyl", forme: "gélules", dosages: ["200 mg"], dci: "nifuroxazide", categories: ["ANTIDIARRHEIQUES"] },
        { nom: "Xetreme", forme: "gélules", dosages: ["80", "125 mg"], dci: "phloroglucinol", categories: ["GASTROLOGIE"] },
        { nom: "Duspaverins", forme: "gélules", dosages: ["100 mg"], dci: "mebeverine", categories: ["GASTROLOGIE"] },
        { nom: "Spascol", forme: "gélules", dosages: ["200 mg"], dci: "mebeverine", categories: ["GASTROLOGIE"] },
        { nom: "Spalverine", forme: "gélules", dosages: ["200 mg"], dci: "mebeverine", categories: ["GASTROLOGIE"] },
        { nom: "Nifuroxazide", forme: "gélules", dosages: ["200 mg"], dci: "nifuroxazide", categories: ["ANTIDIARRHEIQUES"] },
        { nom: "Trimébutine", forme: "comprimés", dosages: ["200", "100 mg"], dci: "trimebutine", categories: ["GASTROLOGIE"] },
        { nom: "Duspatalin", forme: "gélules", dosages: ["200", "100 mg"], dci: "mebeverine", categories: ["GASTROLOGIE"] },
        { nom: "Pinaverium", forme: "comprimés", dosages: ["100 mg"], dci: "pinaverium", categories: ["GASTROLOGIE"] },
        { nom: "Loperidal", forme: "gélules", dosages: ["2 mg"], dci: "loperamide", categories: ["ANTIDIARRHEIQUES"] },
        { nom: "Dimépra", forme: "gélules", dosages: ["2 mg"], dci: "loperamide", categories: ["ANTIDIARRHEIQUES"] },
        { nom: "Pinatel", forme: "comprimés", dosages: ["100 mg"], dci: "pinaverium", categories: ["GASTROLOGIE"] },
        { nom: "Dyarex", forme: "gélules", dosages: ["2 mg"], dci: "loperamide", categories: ["ANTIDIARRHEIQUES"] },
        { nom: "Diaryl", forme: "gélules", dosages: ["2 mg"], dci: "loperamide", categories: ["ANTIDIARRHEIQUES"] },
        { nom: "Imuzole", forme: "comprimés", dosages: ["250 mg"], dci: "metronidazole", categories: ["ANTIBIOTIQUES", "ANTIPARASITAIRES"] },
        { nom: "Eufor", forme: "comprimés", dosages: ["80 mg"], dci: "phloroglucinol", categories: ["GASTROLOGIE"] },
        { nom: "Phloroglucinol", forme: "comprimés", dosages: ["80 mg"], dci: "phloroglucinol", categories: ["GASTROLOGIE"] },
        { nom: "Spacyl", forme: "comprimés", dosages: ["80 mg"], dci: "phloroglucinol", categories: ["GASTROLOGIE"] },
        { nom: "Spacinol", forme: "comprimés", dosages: ["80 mg"], dci: "phloroglucinol", categories: ["GASTROLOGIE"] },
        { nom: "Dompérone", forme: "comprimés", dosages: ["10 mg"], dci: "domperidone", categories: ["GASTROLOGIE"] },
        { nom: "Metronidal", forme: "comprimés", dosages: ["250 mg"], dci: "metronidazole", categories: ["ANTIBIOTIQUES", "ANTIPARASITAIRES"] }
      ],
      colonne4: [
        { nom: "Dompéridone", forme: "comprimés", dosages: ["10 mg"], dci: "domperidone", categories: ["GASTROLOGIE"] },
        { nom: "Flazol", forme: "comprimés", dosages: ["500 mg"], dci: "metronidazole", categories: ["ANTIBIOTIQUES", "ANTIPARASITAIRES"] },
        { nom: "Flagyl", forme: "comprimés", dosages: ["250 mg"], dci: "metronidazole", categories: ["ANTIBIOTIQUES", "ANTIPARASITAIRES"] },
        { nom: "Ronidaz", forme: "comprimés", dosages: ["500 mg"], dci: "metronidazole", categories: ["ANTIBIOTIQUES", "ANTIPARASITAIRES"] },
        { nom: "Proton", forme: "gélules", dosages: ["20", "30 mg"], dci: "esomeprazole", categories: ["GASTROLOGIE"] },
        { nom: "Antag", forme: "gélules", dosages: ["20 mg"], dci: "omeprazole", categories: ["GASTROLOGIE"] },
        { nom: "Neogastric", forme: "gélules", dosages: ["20 mg"], dci: "omeprazole", categories: ["GASTROLOGIE"] },
        { nom: "Lanzomed", forme: "comprimés", dosages: ["30 mg"], dci: "lansoprazole", categories: ["GASTROLOGIE"] },
        { nom: "Zimor", forme: "gélules", dosages: ["20 mg"], dci: "omeprazole", categories: ["GASTROLOGIE"] },
        { nom: "Lansopomp", forme: "gélules", dosages: ["30 mg"], dci: "lansoprazole", categories: ["GASTROLOGIE"] },
        { nom: "Omedar", forme: "comprimés", dosages: ["20 mg"], dci: "omeprazole", categories: ["GASTROLOGIE"] },
        { nom: "Zopra", forme: "gélules", dosages: ["30 mg"], dci: "lansoprazole", categories: ["GASTROLOGIE"] },
        { nom: "Glybek", forme: "comprimés", dosages: ["50 mg"], dci: "vildagliptine", categories: ["METABOLISME"] },
        { nom: "Dexilant", forme: "gélules", dosages: ["30 mg"], dci: "dexlansoprazole", categories: ["GASTROLOGIE"] },
        { nom: "Famotidine", forme: "comprimés", dosages: ["40 mg"], dci: "famotidine", categories: ["GASTROLOGIE"] },
        { nom: "Fucidine", forme: "comprimés", dosages: ["250 mg"], dci: "acide fusidique", categories: ["ANTIBIOTIQUES"] },
        { nom: "Corect", forme: "comprimés", dosages: ["50 mg"], dci: "vildagliptine", categories: ["METABOLISME"] },
        { nom: "Glinix", forme: "comprimés", dosages: ["1 mg"], dci: "glimepiride", categories: ["METABOLISME"] },
        { nom: "Evopranol", forme: "comprimés", dosages: ["40 mg"], dci: "pantoprazole", categories: ["GASTROLOGIE"] },
        { nom: "Vipdomet", forme: "comprimés", dosages: ["1000 mg"], dci: "metformine vildagliptine", categories: ["METABOLISME"] },
        { nom: "Larimel", forme: "comprimés", dosages: ["50 mg"], dci: "vildagliptine", categories: ["METABOLISME"] },
        { nom: "Vipidia", forme: "comprimés", dosages: ["12.5", "25 mg"], dci: "alogliptine", categories: ["METABOLISME"] },
        { nom: "Valens", forme: "comprimés", dosages: ["10 mg"], dci: "enalapril", categories: ["CARDIOLOGIE"] },
        { nom: "Triaxone", forme: "comprimés", dosages: ["200 mg"], dci: "cefixime", categories: ["ANTIBIOTIQUES"] },
        { nom: "Un-alfa", forme: "capsule", dosages: ["1 mcg"], dci: "alfacalcidol", categories: ["METABOLISME"] },
        { nom: "Arbose", forme: "comprimés", dosages: ["50 mg"], dci: "acarbose", categories: ["METABOLISME"] },
        { nom: "Sitamine", forme: "comprimés", dosages: ["1000 mg"], dci: "metformine", categories: ["METABOLISME"] },
        { nom: "Imurel", forme: "comprimés", dosages: ["50 mg"], dci: "azathioprine", categories: ["IMMUNOSUPPRESSEURS"] },
        { nom: "Galvine", forme: "comprimés", dosages: ["50 mg"], dci: "vildagliptine", categories: ["METABOLISME"] }
      ]
    },
    ligne4: {
      colonne1: [
        { nom: "Clamoxyl", forme: "voie orale", dosages: ["500", "250 mg"], dci: "amoxicilline", categories: ["ANTIBIOTIQUES"] },
        { nom: "Amoxypen", forme: "poudre", dosages: ["500 mg"], dci: "amoxicilline", categories: ["ANTIBIOTIQUES"] },
        { nom: "Zomax", forme: "poudre", dosages: ["600", "1200", "900", "1500 mg"], dci: "azithromycine", categories: ["ANTIBIOTIQUES"] },
        { nom: "Bioclav", forme: "poudre", dosages: ["100 mg"], dci: "amoxicilline clavulanate", categories: ["ANTIBIOTIQUES"] },
        { nom: "Augmentin", forme: "poudre", dosages: ["100 mg"], dci: "amoxicilline clavulanate", categories: ["ANTIBIOTIQUES"] }
      ],
      colonne2: [
        { nom: "Amoclan", forme: "poudre", dosages: ["100 mg"], dci: "amoxicilline clavulanate", categories: ["ANTIBIOTIQUES"] },
        { nom: "Diarrhétine", forme: "sirop", dosages: [], dci: "racecadotril", categories: ["ANTIDIARRHEIQUES"] },
        { nom: "Inphadium", forme: "solution buvable", dosages: ["0.2 mg"], dci: "racecadotril", categories: ["ANTIDIARRHEIQUES"] },
        { nom: "Orapen", forme: "poudre", dosages: ["5 ml"], dci: "phenoxymethylpenicilline", categories: ["ANTIBIOTIQUES"] },
        { nom: "Flagyl", forme: "sirop", dosages: ["4%"], dci: "metronidazole", categories: ["ANTIBIOTIQUES", "ANTIPARASITAIRES"] },
        { nom: "Predo", forme: "sirop", dosages: ["15 mg"], dci: "prednisolone", categories: ["ANTI-INFLAMMATOIRES"] },
        { nom: "Metagyl", forme: "sirop", dosages: ["4%"], dci: "metronidazole", categories: ["ANTIBIOTIQUES", "ANTIPARASITAIRES"] },
        { nom: "Efferalgan", forme: "sirop", dosages: ["3%"], dci: "paracetamol", categories: ["ANTALGIQUES"] }
      ],
      colonne3: [
        { nom: "Diprim", forme: "sirop", dosages: ["200 mg"], dci: "ibuprofene", categories: ["ANTI-INFLAMMATOIRES", "ANTALGIQUES"] },
        { nom: "Dolpriv", forme: "sirop", dosages: ["3%"], dci: "paracetamol", categories: ["ANTALGIQUES"] },
        { nom: "Isomol", forme: "sirop", dosages: ["100 mg"], dci: "paracetamol", categories: ["ANTALGIQUES"] },
        { nom: "Pediamol", forme: "sirop", dosages: ["3%"], dci: "paracetamol", categories: ["ANTALGIQUES"] },
        { nom: "Doliprane", forme: "sirop", dosages: ["2.4%"], dci: "paracetamol", categories: ["ANTALGIQUES"] },
        { nom: "Antalfen", forme: "sirop", dosages: ["20 mg"], dci: "ibuprofene", categories: ["ANTI-INFLAMMATOIRES", "ANTALGIQUES"] },
        { nom: "Algifen", forme: "sirop", dosages: ["20 mg"], dci: "ibuprofene", categories: ["ANTI-INFLAMMATOIRES", "ANTALGIQUES"] },
        { nom: "Lamylase", forme: "sirop", dosages: [], dci: "alpha amylase", categories: ["GASTROLOGIE"] },
        { nom: "Narufene", forme: "sirop", dosages: ["2%"], dci: "ibuprofene", categories: ["ANTI-INFLAMMATOIRES", "ANTALGIQUES"] },
        { nom: "Maxilase", forme: "sirop", dosages: [], dci: "alpha amylase", categories: ["GASTROLOGIE"] },
        { nom: "Tifen", forme: "sirop", dosages: ["1 mg"], dci: "ketotifene", categories: ["ALLERGOLOGIE"] },
        { nom: "Xydol", forme: "sirop", dosages: ["20 mg"], dci: "ibuprofene", categories: ["ANTI-INFLAMMATOIRES", "ANTALGIQUES"] }
      ],
      colonne4: [
        { nom: "Hassalyse", forme: "sirop", dosages: ["1 mg"], dci: "salbutamol", categories: ["PNEUMOLOGIE"] },
        { nom: "Mentex", forme: "sirop", dosages: [], dci: "carbocisteine", categories: ["PNEUMOLOGIE"] },
        { nom: "Rabwalysr", forme: "sirop", dosages: [], dci: "salbutamol", categories: ["PNEUMOLOGIE"] },
        { nom: "Salbutamol", forme: "sirop", dosages: [], dci: "salbutamol", categories: ["PNEUMOLOGIE"] },
        { nom: "Isospalgine", forme: "sirop", dosages: ["0.2%"], dci: "oxomemazine", categories: ["PNEUMOLOGIE"] },
        { nom: "Carbodal", forme: "sirop", dosages: ["5%"], dci: "carbocisteine", categories: ["PNEUMOLOGIE"] },
        { nom: "Rhinolactol", forme: "sirop", dosages: ["2%"], dci: "carbocisteine", categories: ["PNEUMOLOGIE"] },
        { nom: "Oxoplex", forme: "sirop", dosages: [], dci: "oxomemazine", categories: ["PNEUMOLOGIE"] },
        { nom: "Rhinathiol", forme: "sirop", dosages: ["2%", "5%"], dci: "carbocisteine", categories: ["PNEUMOLOGIE"] },
        { nom: "Eupnex", forme: "sirop", dosages: [], dci: "carbocisteine", categories: ["PNEUMOLOGIE"] },
        { nom: "Tussodex", forme: "sirop", dosages: ["0.2%"], dci: "oxomemazine", categories: ["PNEUMOLOGIE"] },
        { nom: "Atussine Enfants", forme: "sirop", dosages: [], dci: "oxomemazine", categories: ["PNEUMOLOGIE"] },
        { nom: "Bronchocalm", forme: "sirop", dosages: [], dci: "carbocisteine", categories: ["PNEUMOLOGIE"] },
        { nom: "Mucolyse Enfant", forme: "sirop", dosages: [], dci: "carbocisteine", categories: ["PNEUMOLOGIE"] },
        { nom: "Soluxol", forme: "sirop", dosages: ["200 ml"], dci: "carbocisteine", categories: ["PNEUMOLOGIE"] },
        { nom: "Ixol", forme: "sirop", dosages: ["0.3"], dci: "carbocisteine", categories: ["PNEUMOLOGIE"] },
        { nom: "Fluisedal", forme: "sirop", dosages: [], dci: "carbocisteine", categories: ["PNEUMOLOGIE"] },
        { nom: "Sinecod", forme: "sirop", dosages: ["0.15%"], dci: "butamirate", categories: ["PNEUMOLOGIE"] }
      ]
    }
  };

  // Case 2 - Médicaments organisés uniquement par lignes (pas de colonnes)
  const medicationsCase2 = {
    ligne1: [
      { nom: "Votrex", forme: "comprimés", dosages: ["50 mg"], dci: "diclofenac", categories: ["ANTI-INFLAMMATOIRES", "RHUMATOLOGIE"] },
      { nom: "Dilacard", forme: "comprimés", dosages: ["25 mg"], dci: "carvedilol", categories: ["CARDIOLOGIE"] },
      { nom: "Co-atabek", forme: "comprimé", dosages: [], dci: "candesartan hydrochlorothiazide", categories: ["CARDIOLOGIE"] },
      { nom: "Canderax", forme: "comprimés", dosages: ["4", "8 mg"], dci: "candesartan", categories: ["CARDIOLOGIE"] },
      { nom: "Ryvol", forme: "comprimés", dosages: ["15 mg"], dci: "rivaroxaban", categories: ["HEMATOLOGIE"] },
      { nom: "Perindopril", forme: "", dosages: [], dci: "perindopril", categories: ["CARDIOLOGIE"] }
    ],
    ligne2: [
      { nom: "Furozal", forme: "comprimé", dosages: ["40 mg"], dci: "furosemide", categories: ["CARDIOLOGIE"] },
      { nom: "Zanidip", forme: "comprimés", dosages: ["10 mg"], dci: "lercanidipine", categories: ["CARDIOLOGIE"] },
      { nom: "Depadium", forme: "comprimés", dosages: ["10 mg"], dci: "amlodipine", categories: ["CARDIOLOGIE"] },
      { nom: "Nagoxin", forme: "comprimés", dosages: ["0.250 mg"], dci: "digoxine", categories: ["CARDIOLOGIE"] },
      { nom: "Dinazip", forme: "comprimés", dosages: ["10 mg"], dci: "lercanidipine", categories: ["CARDIOLOGIE"] },
      { nom: "Fludex", forme: "comprimés", dosages: ["1.5 mg"], dci: "indapamide", categories: ["CARDIOLOGIE"] },
      { nom: "Aténor", forme: "comprimés", dosages: ["100 mg"], dci: "atenolol", categories: ["CARDIOLOGIE"] },
      { nom: "Nadloric", forme: "comprimés", dosages: ["100 mg"], dci: "allopurinol", categories: ["RHUMATOLOGIE"] },
      { nom: "Zyloric", forme: "comprimés", dosages: ["100 mg"], dci: "allopurinol", categories: ["RHUMATOLOGIE"] },
      { nom: "Metopress", forme: "gélules", dosages: ["100 mg"], dci: "metoprolol", categories: ["CARDIOLOGIE"] },
      { nom: "Furosan", forme: "comprimés", dosages: ["500 mg"], dci: "furosemide", categories: ["CARDIOLOGIE"] },
      { nom: "Teproll", forme: "comprimés", dosages: ["100 mg"], dci: "metoprolol", categories: ["CARDIOLOGIE"] },
      { nom: "Loresta", forme: "comprimés", dosages: ["200 mg"], dci: "allopurinol", categories: ["RHUMATOLOGIE"] },
      { nom: "Hydrex", forme: "comprimés", dosages: ["25 mg"], dci: "hydrochlorothiazide", categories: ["CARDIOLOGIE"] },
      { nom: "Loprox", forme: "comprimés", dosages: ["200 mg"], dci: "allopurinol", categories: ["RHUMATOLOGIE"] },
      { nom: "Dudrex", forme: "comprimés", dosages: ["50 mg"], dci: "hydrochlorothiazide", categories: ["CARDIOLOGIE"] },
      { nom: "Aldomet", forme: "comprimés", dosages: ["250 mg"], dci: "methyldopa", categories: ["CARDIOLOGIE"] },
      { nom: "Spirozide", forme: "comprimés", dosages: [], dci: "spironolactone hydrochlorothiazide", categories: ["CARDIOLOGIE"] },
      { nom: "Spironolone", forme: "comprimé", dosages: ["75 mg"], dci: "spironolactone", categories: ["CARDIOLOGIE"] }
    ],
    ligne3: [
      { nom: "Bipreterax", forme: "comprimé", dosages: ["5 mg"], dci: "perindopril indapamide", categories: ["CARDIOLOGIE"] },
      { nom: "Coversyl", forme: "comprimés", dosages: ["10", "5 mg"], dci: "perindopril", categories: ["CARDIOLOGIE"] },
      { nom: "Perindopril", forme: "comprimés", dosages: ["4", "8mg"], dci: "perindopril", categories: ["CARDIOLOGIE"] },
      { nom: "Telmisarte", forme: "comprimé", dosages: ["40 mg"], dci: "telmisartan", categories: ["CARDIOLOGIE"] },
      { nom: "Micardis Plus", forme: "comprimés", dosages: ["40", "80 mg"], dci: "telmisartan hydrochlorothiazide", categories: ["CARDIOLOGIE"] },
      { nom: "Telmisarte Plus", forme: "comprimés", dosages: ["80 mg"], dci: "telmisartan hydrochlorothiazide", categories: ["CARDIOLOGIE"] },
      { nom: "Telmisarte", forme: "comprimés", dosages: ["40 mg"], dci: "telmisartan", categories: ["CARDIOLOGIE"] },
      { nom: "Telmisarte", forme: "comprimés", dosages: ["80 mg"], dci: "telmisartan", categories: ["CARDIOLOGIE"] },
      { nom: "Micardis", forme: "comprimés", dosages: ["80 mg"], dci: "telmisartan", categories: ["CARDIOLOGIE"] },
      { nom: "Rivalto", forme: "comprimés", dosages: ["20", "15 mg"], dci: "rivaroxaban", categories: ["HEMATOLOGIE"] },
      { nom: "Xiban", forme: "comprimés", dosages: ["5 mg"], dci: "apixaban", categories: ["HEMATOLOGIE"] },
      { nom: "Trombix", forme: "comprimés", dosages: ["15", "20 mg"], dci: "rivaroxaban", categories: ["HEMATOLOGIE"] },
      { nom: "Ryvol", forme: "comprimés", dosages: ["15 mg"], dci: "rivaroxaban", categories: ["HEMATOLOGIE"] }
    ],
    ligne4: [
      { nom: "Dipicard", forme: "comprimé", dosages: ["10", "5 mg"], dci: "amlodipine", categories: ["CARDIOLOGIE"] },
      { nom: "Amlibon", forme: "comprimés", dosages: ["10 mg"], dci: "amlodipine", categories: ["CARDIOLOGIE"] },
      { nom: "Amlor", forme: "gélules", dosages: ["5 mg"], dci: "amlodipine", categories: ["CARDIOLOGIE"] },
      { nom: "Amlodiping", forme: "gélules", dosages: ["10 mg"], dci: "amlodipine", categories: ["CARDIOLOGIE"] },
      { nom: "Amlibon", forme: "comprimés", dosages: ["5 mg"], dci: "amlodipine", categories: ["CARDIOLOGIE"] },
      { nom: "Amlodipine", forme: "comprimés", dosages: ["5 mg"], dci: "amlodipine", categories: ["CARDIOLOGIE"] },
      { nom: "Tensodipine", forme: "gélules", dosages: ["5 mg"], dci: "amlodipine", categories: ["CARDIOLOGIE"] },
      { nom: "Dilacard", forme: "comprimés", dosages: ["6.25", "25", "3.125 mg"], dci: "carvedilol", categories: ["CARDIOLOGIE"] },
      { nom: "Triatec", forme: "comprimés", dosages: ["5", "10", "2.5 mg"], dci: "ramipril", categories: ["CARDIOLOGIE"] },
      { nom: "Tritazide", forme: "comprimés", dosages: ["5", "10 mg"], dci: "ramipril hydrochlorothiazide", categories: ["CARDIOLOGIE"] },
      { nom: "Biopexa", forme: "comprimés", dosages: ["2.5", "5 mg"], dci: "ramipril", categories: ["CARDIOLOGIE"] }
    ],
    ligne5: [
      { nom: "Blopress Plus", forme: "comprimé", dosages: ["16", "8 mg"], dci: "candesartan hydrochlorothiazide", categories: ["CARDIOLOGIE"] },
      { nom: "Blopress", forme: "comprimés", dosages: ["16 mg"], dci: "candesartan", categories: ["CARDIOLOGIE"] },
      { nom: "Moxonidine", forme: "comprimés", dosages: ["0.4", "0.2 mg"], dci: "moxonidine", categories: ["CARDIOLOGIE"] },
      { nom: "Blopress", forme: "comprimés", dosages: ["8 mg"], dci: "candesartan", categories: ["CARDIOLOGIE"] },
      { nom: "Aspirine", forme: "gélules", dosages: ["100 mg"], dci: "acide acetylsalicylique", categories: ["HEMATOLOGIE"] },
      { nom: "Aspec", forme: "comprimés", dosages: ["100 mg"], dci: "acide acetylsalicylique", categories: ["HEMATOLOGIE"] },
      { nom: "Hytacand", forme: "comprimés", dosages: ["16 mg"], dci: "candesartan", categories: ["CARDIOLOGIE"] },
      { nom: "Atacand", forme: "comprimés", dosages: ["16", "8 mg"], dci: "candesartan", categories: ["CARDIOLOGIE"] },
      { nom: "Atabek", forme: "comprimés", dosages: ["8 mg"], dci: "candesartan", categories: ["CARDIOLOGIE"] }
    ]
  };

  // Case 3 - Médicaments organisés uniquement par lignes (pas de colonnes)
  const medicationsCase3 = {
    ligne1: [
      { nom: "Bécanos", forme: "spray nasal", dosages: [], dci: "beclometasone", categories: ["PNEUMOLOGIE", "ALLERGOLOGIE"] },
      { nom: "Nasalix", forme: "spray nasal", dosages: [], dci: "fluticasone", categories: ["PNEUMOLOGIE", "ALLERGOLOGIE"] },
      { nom: "Flixone", forme: "spray nasal", dosages: [], dci: "fluticasone", categories: ["PNEUMOLOGIE", "ALLERGOLOGIE"] },
      { nom: "Donicort", forme: "spray nasal", dosages: [], dci: "budesonide", categories: ["PNEUMOLOGIE", "ALLERGOLOGIE"] },
      { nom: "Tropirus", forme: "inhalateur", dosages: [], dci: "tiotropium", categories: ["PNEUMOLOGIE"] },
      { nom: "Respyfor", forme: "inhalateur", dosages: [], dci: "budesonide formoterol", categories: ["PNEUMOLOGIE"] }
    ],

    ligne2: [
      { nom: "Ventoline", forme: "inhalateur", dosages: [], dci: "salbutamol", categories: ["PNEUMOLOGIE"] },
      { nom: "Nasacet", forme: "spray nasal", dosages: [], dci: "triamcinolone", categories: ["PNEUMOLOGIE", "ALLERGOLOGIE"] },
      { nom: "Flucasone", forme: "spray nasal", dosages: [], dci: "fluticasone", categories: ["PNEUMOLOGIE", "ALLERGOLOGIE"] },
      { nom: "Nasovit", forme: "spray nasal", dosages: [], dci: "beclometasone", categories: ["PNEUMOLOGIE", "ALLERGOLOGIE"] },
      { nom: "Momenex", forme: "spray nasal", dosages: [], dci: "mometasone", categories: ["PNEUMOLOGIE", "ALLERGOLOGIE"] },
      { nom: "Rhinodis", forme: "spray nasal", dosages: [], dci: "budesonide", categories: ["PNEUMOLOGIE", "ALLERGOLOGIE"] },
      { nom: "Nasabec", forme: "spray nasal", dosages: [], dci: "beclometasone", categories: ["PNEUMOLOGIE", "ALLERGOLOGIE"] },
      { nom: "Donicort", forme: "spray nasal", dosages: [], dci: "budesonide", categories: ["PNEUMOLOGIE", "ALLERGOLOGIE"] },
      { nom: "Nasalast", forme: "spray nasal", dosages: [], dci: "azelastine", categories: ["ALLERGOLOGIE"] },
      { nom: "Flucasone", forme: "spray nasal", dosages: [], dci: "fluticasone", categories: ["PNEUMOLOGIE", "ALLERGOLOGIE"] },
      { nom: "Nasodis", forme: "spray nasal", dosages: [], dci: "budesonide", categories: ["PNEUMOLOGIE", "ALLERGOLOGIE"] },
      { nom: "Rinonide", forme: "spray nasal", dosages: [], dci: "budesonide", categories: ["PNEUMOLOGIE", "ALLERGOLOGIE"] },
      { nom: "Nasalast", forme: "spray nasal", dosages: [], dci: "azelastine", categories: ["ALLERGOLOGIE"] },
      { nom: "Tasonex", forme: "spray nasal", dosages: [], dci: "mometasone", categories: ["PNEUMOLOGIE", "ALLERGOLOGIE"] },
      { nom: "Tabiflex", forme: "gel", dosages: ["50 g"], dci: "diclofenac", categories: ["ANTI-INFLAMMATOIRES", "RHUMATOLOGIE"] },
      { nom: "Déflamac", forme: "gel", dosages: ["1 %"], dci: "diclofenac", categories: ["ANTI-INFLAMMATOIRES", "RHUMATOLOGIE"] },
      { nom: "Biofenac", forme: "gel", dosages: ["50 g"], dci: "diclofenac", categories: ["ANTI-INFLAMMATOIRES", "RHUMATOLOGIE"] }
    ],

    ligne3: [
      { nom: "Minesse", forme: "comprimé", dosages: [], dci: "ethinylestradiol gestodene", categories: ["GYNECOLOGIE"] },
      { nom: "Microgynon", forme: "comprimé", dosages: [], dci: "ethinylestradiol levonorgestrel", categories: ["GYNECOLOGIE"] },
      { nom: "Cerazette", forme: "comprimé", dosages: ["0.075 mg"], dci: "desogestrel", categories: ["GYNECOLOGIE"] },
      { nom: "Marilon", forme: "comprimé", dosages: [], dci: "ethinylestradiol desogestrel", categories: ["GYNECOLOGIE"] },
      { nom: "Logynon", forme: "comprimé", dosages: [], dci: "ethinylestradiol levonorgestrel", categories: ["GYNECOLOGIE"] },
      { nom: "Diane", forme: "comprimé", dosages: [], dci: "ethinylestradiol cyproterone", categories: ["GYNECOLOGIE", "DERMATOLOGIE"] },
      { nom: "Marvelon", forme: "comprimé", dosages: [], dci: "ethinylestradiol desogestrel", categories: ["GYNECOLOGIE"] },
      { nom: "Jasmine", forme: "comprimé", dosages: [], dci: "ethinylestradiol drospirenone", categories: ["GYNECOLOGIE"] },
      { nom: "Méliane", forme: "comprimé", dosages: [], dci: "ethinylestradiol gestodene", categories: ["GYNECOLOGIE"] },
      { nom: "Medonex", forme: "spray nasal", dosages: [], dci: "mometasone", categories: ["PNEUMOLOGIE", "ALLERGOLOGIE"] },
      { nom: "Lyana", forme: "comprimé", dosages: [], dci: "levonorgestrel", categories: ["GYNECOLOGIE"] },
      { nom: "Foracort", forme: "inhalateur", dosages: [], dci: "budesonide formoterol", categories: ["PNEUMOLOGIE"] },
      { nom: "Microval", forme: "comprimé", dosages: [], dci: "levonorgestrel", categories: ["GYNECOLOGIE"] },
      { nom: "Budecort", forme: "inhalateur", dosages: [], dci: "budesonide", categories: ["PNEUMOLOGIE"] }
    ],

    ligne4: [
      { nom: "Isolact", forme: "solution buvable", dosages: [], dci: "calcium lactate", categories: ["METABOLISME"] },
      { nom: "Calcidose", forme: "sachet", dosages: [], dci: "calcium", categories: ["METABOLISME"] },
      { nom: "Calcidose 500", forme: "sachet", dosages: ["500 mg"], dci: "calcium", categories: ["METABOLISME"] },
      { nom: "Calcium D3", forme: "comprimé à sucer", dosages: [], dci: "calcium vitamine d3", categories: ["METABOLISME"] },
      { nom: "Ossé D3", forme: "comprimé à sucer", dosages: [], dci: "calcium vitamine d3", categories: ["METABOLISME"] },
      { nom: "Idéos", forme: "comprimé à sucer", dosages: [], dci: "calcium vitamine d3", categories: ["METABOLISME"] },
      { nom: "Calperos", forme: "comprimé à sucer", dosages: ["500 mg"], dci: "calcium", categories: ["METABOLISME"] }
    ],

    ligne5: [
      { nom: "Isomag", forme: "sirop", dosages: ["150 ml"], dci: "magnesium", categories: ["METABOLISME"] },
      { nom: "Selofer 100", forme: "sirop", dosages: [], dci: "fer", categories: ["HEMATOLOGIE", "METABOLISME"] },
      { nom: "Orfer Plus", forme: "sirop", dosages: [], dci: "fer", categories: ["HEMATOLOGIE", "METABOLISME"] },
      { nom: "Geo Fer", forme: "sirop", dosages: [], dci: "fer", categories: ["HEMATOLOGIE", "METABOLISME"] },
      { nom: "Selofer 50", forme: "sirop", dosages: [], dci: "fer", categories: ["HEMATOLOGIE", "METABOLISME"] },
      { nom: "Isobulatine", forme: "sirop", dosages: [], dci: "fer", categories: ["HEMATOLOGIE", "METABOLISME"] },
      { nom: "Ferodal", forme: "sirop", dosages: [], dci: "fer", categories: ["HEMATOLOGIE", "METABOLISME"] },
      { nom: "Ferolam", forme: "sirop", dosages: [], dci: "fer", categories: ["HEMATOLOGIE", "METABOLISME"] },
      { nom: "Calcial", forme: "sirop", dosages: [], dci: "calcium", categories: ["METABOLISME"] },
      { nom: "Kaligon", forme: "sirop", dosages: [], dci: "potassium", categories: ["METABOLISME"] }
    ]
  };

  // Case 4 - Médicaments organisés par lignes et colonnes avec DCI
  const medicationsCase4 = {
    ligne1: {
      colonne1: [
        { nom: "Voltum gel", forme: "gel", dosages: ["2%"], dci: "diclofénac", categories: ["ANTI-INFLAMMATOIRES", "RHUMATOLOGIE", "DERMATOLOGIE"] },
        { nom: "Voltarène", forme: "gel", dosages: ["1%"], dci: "diclofénac", categories: ["ANTI-INFLAMMATOIRES", "RHUMATOLOGIE", "DERMATOLOGIE"] }
      ],
      colonne2: [
        { nom: "Brequal", forme: "capsules", dosages: ["50/250", "50/500", "50/100"], dci: "bacitracine + néomycine", categories: ["ANTIBIOTIQUES", "DERMATOLOGIE"] },
        { nom: "Pommade rdermique", forme: "pommade", dosages: [], dci: "émollients", categories: ["DERMATOLOGIE"] },
        { nom: "Bébédouce huile HFM", forme: "pommade", dosages: [], dci: "huile minérale", categories: ["DERMATOLOGIE"] },
        { nom: "Newplastine", forme: "pommade", dosages: [], dci: "vitamine A", categories: ["DERMATOLOGIE", "METABOLISME"] }
      ]
    },

    ligne2: {
      colonne1: [
        { nom: "Clogel", forme: "gel", dosages: ["1%"], dci: "clindamycine", categories: ["ANTIBIOTIQUES", "DERMATOLOGIE"] },
        { nom: "Dektagel", forme: "gel", dosages: ["2%"], dci: "kétoconazole", categories: ["ANTIFONGIQUES", "DERMATOLOGIE"] },
        { nom: "Ulcego", forme: "gel", dosages: ["2%"], dci: "acide fusidique", categories: ["ANTIBIOTIQUES", "DERMATOLOGIE"] },
        { nom: "Daktazol", forme: "gel", dosages: ["2%"], dci: "miconazole", categories: ["ANTIFONGIQUES", "DERMATOLOGIE"] },
        { nom: "Acnyx", forme: "gel", dosages: ["0.1%"], dci: "adapalène", categories: ["DERMATOLOGIE"] },
        { nom: "Ovuzole", forme: "crème", dosages: ["2%"], dci: "éconazole", categories: ["ANTIFONGIQUES", "DERMATOLOGIE"] },
        { nom: "Dermonyx", forme: "crème", dosages: ["2%"], dci: "éconazole", categories: ["ANTIFONGIQUES", "DERMATOLOGIE"] },
        { nom: "Dermox", forme: "crème", dosages: ["2%"], dci: "éconazole", categories: ["ANTIFONGIQUES", "DERMATOLOGIE"] },
        { nom: "Adaferin", forme: "gel", dosages: ["0.1%"], dci: "adapalène", categories: ["DERMATOLOGIE"] },
        { nom: "Mesone", forme: "pommade", dosages: ["0.1%"], dci: "mometasone furoate", categories: ["ANTI-INFLAMMATOIRES", "DERMATOLOGIE"] },
        { nom: "Corten", forme: "crème", dosages: ["1%"], dci: "hydrocortisone", categories: ["ANTI-INFLAMMATOIRES", "DERMATOLOGIE"] },
        { nom: "Sulfadiazine", forme: "crème", dosages: ["1%"], dci: "sulfadiazine argentique", categories: ["ANTIBIOTIQUES", "DERMATOLOGIE"] },
        { nom: "Zeta", forme: "pommade", dosages: ["2%"], dci: "éconazole", categories: ["ANTIFONGIQUES", "DERMATOLOGIE"] },
        { nom: "Mycocine", forme: "pommade", dosages: [], dci: "nystatine", categories: ["ANTIFONGIQUES", "DERMATOLOGIE"] },
        { nom: "Tabeta", forme: "pommade", dosages: ["0.1%"], dci: "bétaméthasone", categories: ["ANTI-INFLAMMATOIRES", "DERMATOLOGIE"] },
        { nom: "Desonyx", forme: "crème", dosages: ["0.1%"], dci: "desonide", categories: ["ANTI-INFLAMMATOIRES", "DERMATOLOGIE"] },
        { nom: "Betacyl", forme: "pommade", dosages: ["3%"], dci: "acide salicylique + bétaméthasone", categories: ["DERMATOLOGIE"] },
        { nom: "Terbil", forme: "crème", dosages: ["1%"], dci: "terbinafine", categories: ["ANTIFONGIQUES", "DERMATOLOGIE"] },
        { nom: "Zeta-plus", forme: "crème", dosages: ["2%"], dci: "éconazole + corticoïde", categories: ["ANTIFONGIQUES", "DERMATOLOGIE"] },
        { nom: "Mycocide", forme: "pommade", dosages: [], dci: "nystatine", categories: ["ANTIFONGIQUES", "DERMATOLOGIE"] },
        { nom: "Lamidaz", forme: "crème", dosages: ["1%"], dci: "terbinafine", categories: ["ANTIFONGIQUES", "DERMATOLOGIE"] },
        { nom: "Alfucine", forme: "pommade", dosages: ["2%"], dci: "acide fusidique", categories: ["ANTIBIOTIQUES", "DERMATOLOGIE"] },
        { nom: "Phanazol", forme: "crème", dosages: ["1%"], dci: "clotrimazole", categories: ["ANTIFONGIQUES", "DERMATOLOGIE"] },
        { nom: "Clomycine", forme: "pommade", dosages: ["3%"], dci: "érythromycine", categories: ["ANTIBIOTIQUES", "DERMATOLOGIE"] },
        { nom: "Betasone", forme: "pommade", dosages: ["0.05%"], dci: "bétaméthasone", categories: ["ANTI-INFLAMMATOIRES", "DERMATOLOGIE"] },
        { nom: "Daprosal", forme: "pommade", dosages: ["3%"], dci: "acide salicylique + bétaméthasone", categories: ["DERMATOLOGIE"] },
        { nom: "Cutacnyl", forme: "gel", dosages: ["10%"], dci: "peroxyde de benzoyle", categories: ["DERMATOLOGIE"] },
        { nom: "Betaprosone", forme: "pommade", dosages: ["0.1%"], dci: "bétaméthasone", categories: ["ANTI-INFLAMMATOIRES", "DERMATOLOGIE"] },
        { nom: "Bétaméthasone", forme: "crème", dosages: ["0.05%"], dci: "bétaméthasone", categories: ["ANTI-INFLAMMATOIRES", "DERMATOLOGIE"] },
        { nom: "Vavo", forme: "crème", dosages: ["2%"], dci: "éconazole", categories: ["ANTIFONGIQUES", "DERMATOLOGIE"] },
        { nom: "Mycozol", forme: "crème", dosages: ["2%"], dci: "kétoconazole", categories: ["ANTIFONGIQUES", "DERMATOLOGIE"] },
        { nom: "Ketoskin", forme: "crème", dosages: ["2%"], dci: "kétoconazole", categories: ["ANTIFONGIQUES", "DERMATOLOGIE"] }
      ]
    },

    ligne3: {
      colonne1: [
        { nom: "Ketum", forme: "gel", dosages: [], dci: "kétoprofène", categories: ["ANTI-INFLAMMATOIRES", "RHUMATOLOGIE"] },
        { nom: "Cortisaf", forme: "crème", dosages: [], dci: "hydrocortisone", categories: ["ANTI-INFLAMMATOIRES", "DERMATOLOGIE"] },
        { nom: "Clobecort", forme: "crème", dosages: ["0.05%"], dci: "clobétasol", categories: ["ANTI-INFLAMMATOIRES", "DERMATOLOGIE"] },
        { nom: "Oxyfenac", forme: "gel", dosages: ["1%"], dci: "diclofénac", categories: ["ANTI-INFLAMMATOIRES", "RHUMATOLOGIE"] },
        { nom: "Saifen", forme: "gel", dosages: ["2.5%"], dci: "kétoprofène", categories: ["ANTI-INFLAMMATOIRES", "RHUMATOLOGIE"] },
        { nom: "Flucidal", forme: "pommade", dosages: ["3%"], dci: "acide fusidique", categories: ["ANTIBIOTIQUES", "DERMATOLOGIE"] },
        { nom: "Clotasol", forme: "crème/pommade", dosages: ["0.05%"], dci: "clobétasol", categories: ["ANTI-INFLAMMATOIRES", "DERMATOLOGIE"] },
        { nom: "Stopmycose", forme: "crème", dosages: ["1%"], dci: "terbinafine", categories: ["ANTIFONGIQUES", "DERMATOLOGIE"] }
      ],
      colonne2: [
        { nom: "Lemod-solu", forme: "solution injectable", dosages: ["40 mg"], dci: "méthylprednisolone", categories: ["ANTI-INFLAMMATOIRES"] },
        { nom: "Retarciline", forme: "injectable", dosages: ["600 000", "1 200 000 UI"], dci: "benzathine benzylpénicilline", categories: ["ANTIBIOTIQUES"] },
        { nom: "Extencine", forme: "injectable", dosages: ["1.2 M UI"], dci: "benzathine benzylpénicilline", categories: ["ANTIBIOTIQUES"] },
        { nom: "Peni G", forme: "injectable", dosages: ["1 M UI"], dci: "benzylpénicilline", categories: ["ANTIBIOTIQUES"] },
        { nom: "Gectapen", forme: "injectable", dosages: ["1 000 000 UI"], dci: "benzylpénicilline", categories: ["ANTIBIOTIQUES"] },
        { nom: "Cefazal", forme: "injectable", dosages: ["1 g"], dci: "céfazoline", categories: ["ANTIBIOTIQUES"] },
        { nom: "Amoxypen", forme: "injectable", dosages: ["1 g", "500 mg"], dci: "amoxicilline", categories: ["ANTIBIOTIQUES"] },
        { nom: "Biopamox", forme: "injectable", dosages: ["1 g"], dci: "amoxicilline", categories: ["ANTIBIOTIQUES"] }
      ]
    },

    ligne4: {
      colonne1: [
        { nom: "Heptal", forme: "sirop", dosages: ["2 mg"], dci: "cyproheptadine", categories: ["ALLERGOLOGIE"] },
        { nom: "Srospan", forme: "sirop", dosages: [], dci: "prednisolone", categories: ["ANTI-INFLAMMATOIRES"] },
        { nom: "G-sulpiride", forme: "sirop", dosages: [], dci: "sulpiride", categories: ["PSYCHIATRIE"] },
        { nom: "Primal", forme: "sirop", dosages: ["0.5 mg"], dci: "dexchlorphéniramine", categories: ["ALLERGOLOGIE"] },
        { nom: "Sulpiren", forme: "sirop", dosages: ["0.5%"], dci: "sulpiride", categories: ["PSYCHIATRIE"] },
        { nom: "Sunadil", forme: "sirop", dosages: ["0.5 g"], dci: "paracétamol", categories: ["ANTALGIQUES"] },
        { nom: "Heptagyl", forme: "sirop", dosages: ["0.04%"], dci: "métronidazole", categories: ["ANTIBIOTIQUES", "ANTIPARASITAIRES"] },
        { nom: "Sailox", forme: "sirop", dosages: [], dci: "amoxicilline", categories: ["ANTIBIOTIQUES"] }
      ],
      colonne2: [
        { nom: "Isoctine", forme: "sirop", dosages: ["2 mg"], dci: "chlorhexidine", categories: ["ANTISEPTIQUES"] },
        { nom: "Loradine", forme: "sirop", dosages: ["0.1 g"], dci: "loratadine", categories: ["ALLERGOLOGIE"] },
        { nom: "Nobac", forme: "sirop", dosages: [], dci: "nifuroxazide", categories: ["ANTIDIARRHEIQUES"] },
        { nom: "Peptidac", forme: "sirop", dosages: [], dci: "famotidine", categories: ["GASTROLOGIE"] },
        { nom: "Nobac seringue", forme: "orale", dosages: [], dci: "nifuroxazide", categories: ["ANTIDIARRHEIQUES"] },
        { nom: "Maalox", forme: "sirop", dosages: [], dci: "hydroxyde d'aluminium + magnésium", categories: ["GASTROLOGIE"] },
        { nom: "Clopramid", forme: "sirop", dosages: [], dci: "métoclopramide", categories: ["GASTROLOGIE"] },
        { nom: "Peridium", forme: "sirop", dosages: [], dci: "dompéridone", categories: ["GASTROLOGIE"] },
        { nom: "Isolact", forme: "sirop", dosages: [], dci: "lactulose", categories: ["GASTROLOGIE"] }
      ]
    }
  };

  // Case 5 - Médicaments organisés uniquement par lignes
  const medicationsCase5 = {
    ligne1: [
      { nom: "Bufomix Easyhaler", forme: "inhalateur", dosages: [], dci: "budesonide formoterol", categories: ["PNEUMOLOGIE"] },
      { nom: "Symbicort", forme: "inhalateur", dosages: ["100", "200", "400"], dci: "budesonide formoterol", categories: ["PNEUMOLOGIE"] },
      { nom: "Levothyrox", forme: "comprimés", dosages: ["25", "50", "75", "100 µg"], dci: "levothyroxine", categories: ["METABOLISME"] },
      { nom: "Serexon", forme: "gélules", dosages: ["160 mg"], dci: "serenoa repens", categories: ["TROUBLE GENITO-URINAIRE"] },
      { nom: "Nicardipine", forme: "gélules", dosages: ["50 mg"], dci: "nicardipine", categories: ["CARDIOLOGIE"] }
    ],

    ligne2: [
      { nom: "Mytricine", forme: "sirop", dosages: ["10 %"], dci: "nystatine", categories: ["ANTIFONGIQUES"] },
      { nom: "Loxen", forme: "gélules", dosages: ["50 mg"], dci: "nicardipine", categories: ["CARDIOLOGIE"] },
      { nom: "Fungizone", forme: "sirop", dosages: ["10 %"], dci: "amphotericine B", categories: ["ANTIFONGIQUES"] },
      { nom: "Biolestene Chronodose", forme: "injectable", dosages: ["5.7 mg"], dci: "estradiol", categories: ["GYNECOLOGIE"] },
      { nom: "Bioprostene", forme: "injectable", dosages: ["5 mg"], dci: "estradiol", categories: ["GYNECOLOGIE"] },
      { nom: "Nolvadex", forme: "comprimés", dosages: ["10", "20 mg"], dci: "tamoxifene", categories: ["GYNECOLOGIE"] },
      { nom: "Theracort", forme: "injectable", dosages: ["40 mg"], dci: "triamcinolone", categories: ["ANTI-INFLAMMATOIRES"] },
      { nom: "Kenacortyl", forme: "injectable", dosages: ["40 mg"], dci: "triamcinolone", categories: ["ANTI-INFLAMMATOIRES"] },
      { nom: "Levotiron", forme: "comprimés", dosages: ["50", "100 µg"], dci: "levothyroxine", categories: ["METABOLISME"] },
      { nom: "Aldara", forme: "crème", dosages: ["5 %"], dci: "imiquimod", categories: ["DERMATOLOGIE"] },
      { nom: "Prostamed", forme: "comprimés", dosages: ["5 mg"], dci: "finasteride", categories: ["TROUBLE GENITO-URINAIRE"] },
      { nom: "Gadovist", forme: "injectable", dosages: ["1"], dci: "gadobutrol", categories: ["DIAGNOSTIC"] },
      { nom: "Serexon", forme: "comprimés", dosages: ["160 mg"], dci: "serenoa repens", categories: ["TROUBLE GENITO-URINAIRE"] },
      { nom: "Nitroxal", forme: "comprimés", dosages: ["100 mg"], dci: "nitrofurantoine", categories: ["ANTIBIOTIQUES", "TROUBLE GENITO-URINAIRE"] }
    ],

    ligne3: [
      { nom: "Lidocaïne", forme: "gel", dosages: ["2 %"], dci: "lidocaine", categories: ["ANESTHESIQUES"] },
      { nom: "Ursa", forme: "gélules", dosages: ["200 mg"], dci: "acide ursodesoxycholique", categories: ["GASTROLOGIE"] },
      { nom: "Hycosone", forme: "comprimés", dosages: ["10 mg"], dci: "hydrocortisone", categories: ["ANTI-INFLAMMATOIRES"] },
      { nom: "Harufen", forme: "patchs", dosages: [], dci: "ibuprofene", categories: ["ANTI-INFLAMMATOIRES", "ANTALGIQUES"] },
      { nom: "Xaria", forme: "comprimés", dosages: ["200 mg"], dci: "celecoxib", categories: ["ANTI-INFLAMMATOIRES", "RHUMATOLOGIE"] },
      { nom: "Romasine", forme: "comprimés", dosages: ["25 mg"], dci: "exemestane", categories: ["GYNECOLOGIE"] },
      { nom: "Hydrocortisone Roussel", forme: "comprimés", dosages: ["10 mg"], dci: "hydrocortisone", categories: ["ANTI-INFLAMMATOIRES"] },
      { nom: "Dipronad", forme: "injectable", dosages: ["7 mg"], dci: "betamethasone", categories: ["ANTI-INFLAMMATOIRES"] },
      { nom: "Minoxidil", forme: "solution", dosages: ["5 %"], dci: "minoxidil", categories: ["DERMATOLOGIE"] },
      { nom: "Casodex", forme: "comprimés", dosages: ["50 mg"], dci: "bicalutamide", categories: ["GYNECOLOGIE"] },
      { nom: "Dédrogyl", forme: "gouttes", dosages: ["15 mg"], dci: "calcifediol", categories: ["METABOLISME"] },
      { nom: "Auraceno", forme: "comprimés", dosages: [], dci: "isotretinoine", categories: ["DERMATOLOGIE"] },
      { nom: "Progynova", forme: "comprimés", dosages: [], dci: "estradiol valerate", categories: ["GYNECOLOGIE"] },
      { nom: "Délice cheveux", forme: "solution", dosages: [], dci: "vitamines et acides amines", categories: ["DERMATOLOGIE", "METABOLISME"] }
    ],

    ligne4: [
      { nom: "Calcibronat", forme: "comprimés effervescents", dosages: ["2 g"], dci: "calcium bromure", categories: ["METABOLISME"] },
      { nom: "Minoxidil", forme: "solution", dosages: ["2 %"], dci: "minoxidil", categories: ["DERMATOLOGIE"] },
      { nom: "Locoïd", forme: "crème", dosages: ["0.1 %"], dci: "hydrocortisone butyrate", categories: ["DERMATOLOGIE", "ANTI-INFLAMMATOIRES"] },
      { nom: "Exirb", forme: "comprimés", dosages: ["150", "300 mg"], dci: "irbesartan", categories: ["CARDIOLOGIE"] },
      { nom: "Novarol", forme: "comprimés", dosages: ["4 mg"], dci: "estradiol", categories: ["GYNECOLOGIE"] },
      { nom: "Carbimazole", forme: "comprimés", dosages: ["5 mg"], dci: "carbimazole", categories: ["METABOLISME"] },
      { nom: "Evocarbizole", forme: "comprimés", dosages: ["5 mg"], dci: "carbimazole", categories: ["METABOLISME"] },
      { nom: "Asthalin", forme: "inhalateur", dosages: [], dci: "salbutamol", categories: ["PNEUMOLOGIE"] }
    ],

    ligne5: [
      { nom: "Vavo", forme: "shampooing", dosages: ["2 %"], dci: "ketoconazole", categories: ["ANTIFONGIQUES", "DERMATOLOGIE"] },
      { nom: "Météolax", forme: "comprimés", dosages: ["125 mg"], dci: "simethicone", categories: ["GASTROLOGIE"] },
      { nom: "Meteospasmyl", forme: "capsules", dosages: ["300 mg"], dci: "alverine simethicone", categories: ["GASTROLOGIE"] },
      { nom: "Brufine", forme: "émulsion", dosages: ["0.67 %"], dci: "ibuprofene", categories: ["ANTI-INFLAMMATOIRES", "ANTALGIQUES"] }
    ]
  };

  // Case 6 - Médicaments organisés par lignes et colonnes
  const medicationsCase6 = {
    ligne1: {
      colonne1: [
        { nom: "Rosustine", forme: "comprimé", dosages: ["20 mg"], dci: "rosuvastatine", categories: ["METABOLISME"] },
        { nom: "Diarfil", forme: "sachet", dosages: ["30 mg"], dci: "diacéréine", categories: ["RHUMATOLOGIE"] },
        { nom: "Docatril", forme: "sachet", dosages: ["30 mg"], dci: "nesiritide", categories: ["CARDIOLOGIE"] },
        { nom: "Pentazine", forme: "sachet", dosages: ["500 mg", "1000 mg"], dci: "pentoxifylline", categories: ["HEMATOLOGIE"] },
        { nom: "Supertat", forme: "comprimé", dosages: ["20 mg"], dci: "simvastatine", categories: ["METABOLISME"] },
        { nom: "Fumacur", forme: "comprimé", dosages: ["200 mg"], dci: "fumarate ferreux", categories: ["HEMATOLOGIE", "METABOLISME"] },
        { nom: "Arovan", forme: "comprimé", dosages: ["10 mg"], dci: "losartan", categories: ["CARDIOLOGIE"] },
        { nom: "Paramol", forme: "comprimé", dosages: ["1000 mg"], dci: "paracetamol", categories: ["ANTALGIQUES"] }
      ],
      colonne2: [
        { nom: "Montelair", forme: "comprimé", dosages: ["5 mg"], dci: "montelukast", categories: ["PNEUMOLOGIE", "ALLERGOLOGIE"] },
        { nom: "Votrex", forme: "comprimé", dosages: ["50 mg"], dci: "diclofenac", categories: ["ANTI-INFLAMMATOIRES", "RHUMATOLOGIE"] },
        { nom: "Blopress", forme: "comprimé", dosages: ["16 mg"], dci: "candesartan", categories: ["CARDIOLOGIE"] },
        { nom: "Atorvastatine", forme: "comprimé", dosages: ["20 mg"], dci: "atorvastatine", categories: ["METABOLISME"] },
        { nom: "Arovan", forme: "comprimé", dosages: ["10 mg"], dci: "losartan", categories: ["CARDIOLOGIE"] },
        { nom: "Micardis", forme: "comprimé", dosages: ["80 mg"], dci: "telmisartan", categories: ["CARDIOLOGIE"] }
      ]
    },
    ligne2: {
      colonne1: [
        { nom: "Diacare", forme: "sachet", dosages: ["30 mg"], dci: "diacéréine", categories: ["RHUMATOLOGIE"] },
        { nom: "Polydexa", forme: "ear solution", dosages: [], dci: "dexamethasone + neomycine + polymyxine B", categories: ["OTOLOGIE", "ANTIBIOTIQUES"] },
        { nom: "Oricalm", forme: "ear solution", dosages: ["16 g"], dci: "non précisé", categories: ["OTOLOGIE"] },
        { nom: "Otocrovis", forme: "ear solution", dosages: [], dci: "non précisé", categories: ["OTOLOGIE"] },
        { nom: "Célofon", forme: "sachet", dosages: ["10 mg", "30 mg"], dci: "céfuroxime", categories: ["ANTIBIOTIQUES"] },
        { nom: "Tiopam", forme: "sachet", dosages: ["10 mg"], dci: "tiopronine", categories: ["METABOLISME"] },
        { nom: "Gatimox", forme: "sticks", dosages: [], dci: "amoxicilline", categories: ["ANTIBIOTIQUES"] },
        { nom: "Folacid", forme: "comprimé", dosages: ["5 mg"], dci: "acide folique", categories: ["HEMATOLOGIE", "METABOLISME"] },
        { nom: "Fonitra", forme: "comprimé", dosages: ["5 mg"], dci: "niacine", categories: ["METABOLISME"] },
        { nom: "Zanitra", forme: "comprimé", dosages: ["5 mg"], dci: "non précisé", categories: ["METABOLISME"] },
        { nom: "Nobac", forme: "stick", dosages: [], dci: "non précisé", categories: ["ANTIDIARRHEIQUES"] }
      ],
      colonne2: [
        { nom: "Oprim", forme: "comprimé", dosages: ["5 mg", "10 mg"], dci: "omeprazole", categories: ["GASTROLOGIE"] },
        { nom: "Limenda", forme: "ovules", dosages: ["750 mg"], dci: "miconazole", categories: ["ANTIFONGIQUES", "GYNECOLOGIE"] },
        { nom: "Ultrogestan", forme: "capsule molle", dosages: ["200 mg"], dci: "progesterone", categories: ["GYNECOLOGIE"] },
        { nom: "Progeva", forme: "capsule molle", dosages: ["200 mg"], dci: "estradiol + dydrogesterone", categories: ["GYNECOLOGIE"] },
        { nom: "Polyvax", forme: "ovules", dosages: [], dci: "non précisé", categories: ["GYNECOLOGIE"] },
        { nom: "Uricare", forme: "sachet", dosages: ["3 g"], dci: "allopurinol", categories: ["RHUMATOLOGIE"] },
        { nom: "Naftiretard", forme: "comprimé", dosages: ["200 mg"], dci: "naftifine", categories: ["ANTIFONGIQUES"] },
        { nom: "Uroxyb", forme: "comprimé", dosages: ["5 mg"], dci: "oxybuprocaine", categories: ["ANESTHESIQUES"] },
        { nom: "Oxyptane", forme: "comprimé", dosages: ["5 mg"], dci: "oxybuprocaine", categories: ["ANESTHESIQUES"] },
        { nom: "Orospray", forme: "solution antiseptique", dosages: [], dci: "chlorhexidine", categories: ["ANTISEPTIQUES"] },
        { nom: "Humex", forme: "solution buvable", dosages: [], dci: "pseudoephedrine + paracetamol", categories: ["ALLERGOLOGIE", "ANTALGIQUES"] },
        { nom: "Oxidine", forme: "spray", dosages: [], dci: "povidone-iodine", categories: ["ANTISEPTIQUES"] }
      ]
    },
    ligne3: {
      colonne1: [
        { nom: "Pentazine", forme: "sachet", dosages: ["1 g"], dci: "pentoxifylline", categories: ["HEMATOLOGIE"] },
        { nom: "Biovex", forme: "sachet", dosages: [], dci: "non précisé", categories: ["PNEUMOLOGIE"] },
        { nom: "Rhynex", forme: "sachet", dosages: [], dci: "non précisé", categories: ["PNEUMOLOGIE"] },
        { nom: "Paravex", forme: "sachet", dosages: [], dci: "non précisé", categories: ["PNEUMOLOGIE"] },
        { nom: "Lomac", forme: "gélule", dosages: ["20 mg"], dci: "lomustine", categories: ["NEUROLOGIE"] },
        { nom: "Econazyl", forme: "lait dermique 1%", dosages: ["1%"], dci: "econazole", categories: ["ANTIFONGIQUES", "DERMATOLOGIE"] },
        { nom: "Phexaryl", forme: "solution 1%", dosages: ["1%"], dci: "chlorhexidine + hexamidine", categories: ["ANTISEPTIQUES"] },
        { nom: "Econazyl", forme: "solution 1%", dosages: ["1%"], dci: "econazole", categories: ["ANTIFONGIQUES"] },
        { nom: "Frakidex", forme: "collyre", dosages: [], dci: "dexamethasone", categories: ["OPHTALMOLOGIE"] },
        { nom: "Ciprotek", forme: "collyre 0,3%", dosages: ["0,3%"], dci: "ciprofloxacine", categories: ["OPHTALMOLOGIE", "ANTIBIOTIQUES"] },
        { nom: "Chibro Cardon", forme: "solution", dosages: [], dci: "non précisé", categories: ["OPHTALMOLOGIE"] },
        { nom: "Dexatek", forme: "flacon", dosages: [], dci: "dexamethasone", categories: ["OPHTALMOLOGIE"] },
        { nom: "Travadrop", forme: "collyre", dosages: [], dci: "travoprost", categories: ["OPHTALMOLOGIE"] },
        { nom: "Zolamide", forme: "collyre", dosages: [], dci: "dorzolamide", categories: ["OPHTALMOLOGIE"] },
        { nom: "Lumera", forme: "collyre 0,3 mg", dosages: ["0,3 mg"], dci: "luminance", categories: ["OPHTALMOLOGIE"] },
        { nom: "Eso gouttes", forme: "solution", dosages: [], dci: "esomeprazole", categories: ["GASTROLOGIE"] },
        { nom: "Zalerg", forme: "collyre", dosages: [], dci: "olopatadine", categories: ["OPHTALMOLOGIE", "ALLERGOLOGIE"] }
      ],
      colonne2: [
        { nom: "Optif Plus", forme: "collyre", dosages: [], dci: "tobramycine + dexamethasone", categories: ["OPHTALMOLOGIE", "ANTIBIOTIQUES"] },
        { nom: "Oflodexa", forme: "collyre 1 mg", dosages: ["1 mg"], dci: "ofloxacin", categories: ["OPHTALMOLOGIE", "ANTIBIOTIQUES"] },
        { nom: "Vibac", forme: "solution 1,5%", dosages: ["1,5%"], dci: "hydrocortisone + neomycine", categories: ["OPHTALMOLOGIE"] },
        { nom: "Zydex", forme: "gel 1%", dosages: ["1%"], dci: "miconazole", categories: ["ANTIFONGIQUES"] },
        { nom: "Opatek", forme: "flacon 1 mg", dosages: ["1 mg"], dci: "dexamethasone", categories: ["OPHTALMOLOGIE"] },
        { nom: "Indocollyre", forme: "collyre 0,1%", dosages: ["0,1%"], dci: "indomethacine", categories: ["OPHTALMOLOGIE", "ANTI-INFLAMMATOIRES"] },
        { nom: "Obrax", forme: "collyre 0,3%", dosages: ["0,3%"], dci: "tobramycine", categories: ["OPHTALMOLOGIE", "ANTIBIOTIQUES"] },
        { nom: "Pharynvit", forme: "flacon", dosages: [], dci: "vitamines", categories: ["METABOLISME"] },
        { nom: "Clomycine", forme: "pommade 1%", dosages: ["1%"], dci: "clindamycine", categories: ["ANTIBIOTIQUES"] },
        { nom: "Opadex", forme: "flacon 1 mg", dosages: ["1 mg"], dci: "dexamethasone", categories: ["OPHTALMOLOGIE"] },
        { nom: "Sterdex", forme: "pommade", dosages: [], dci: "dexamethasone + neomycine", categories: ["OPHTALMOLOGIE", "ANTIBIOTIQUES"] },
        { nom: "Travost", forme: "flacon", dosages: [], dci: "travoprost", categories: ["OPHTALMOLOGIE"] },
        { nom: "Artelac", forme: "flacon", dosages: [], dci: "sodium hyaluronate", categories: ["OPHTALMOLOGIE"] },
        { nom: "Cronolone-neo", forme: "pommade", dosages: [], dci: "hydrocortisone + neomycine", categories: ["OPHTALMOLOGIE"] },
        { nom: "Cartéol", forme: "collyre 1% et 2%", dosages: ["1%", "2%"], dci: "cartéolol", categories: ["OPHTALMOLOGIE"] },
        { nom: "Therafresh", forme: "flacon 0,2%", dosages: ["0,2%"], dci: "dexamethasone + neomycine", categories: ["OPHTALMOLOGIE"] },
        { nom: "Normoptic", forme: "collyre 0,5%", dosages: ["0,5%"], dci: "brinzolamide", categories: ["OPHTALMOLOGIE"] },
        { nom: "Cipro", forme: "gouttes 0,3%", dosages: ["0,3%"], dci: "ciprofloxacine", categories: ["OPHTALMOLOGIE", "ANTIBIOTIQUES"] },
        { nom: "Timolamid", forme: "collyre 20 mg", dosages: ["20 mg"], dci: "timolol", categories: ["OPHTALMOLOGIE"] },
        { nom: "Chibrogen", forme: "collyre 0,3%", dosages: ["0,3%"], dci: "chloramphenicol", categories: ["OPHTALMOLOGIE", "ANTIBIOTIQUES"] },
        { nom: "Cozolamide", forme: "voie oculaire", dosages: [], dci: "dorzolamide", categories: ["OPHTALMOLOGIE"] },
        { nom: "Dupbaston", forme: "comprimé", dosages: ["10 mg"], dci: "bastozol", categories: ["GYNECOLOGIE"] }
      ]
    },
    ligne4: {
      colonne1: [
        { nom: "Efferalgan codéine", forme: "comprimé", dosages: [], dci: "paracetamol + codéine", categories: ["ANTALGIQUES"] },
        { nom: "Dolised", forme: "comprimé", dosages: [], dci: "paracetamol", categories: ["ANTALGIQUES"] },
        { nom: "Coparalgan", forme: "comprimé", dosages: [], dci: "paracetamol + codeine", categories: ["ANTALGIQUES"] },
        { nom: "Coparamol", forme: "comprimé", dosages: [], dci: "paracetamol + codeine", categories: ["ANTALGIQUES"] },
        { nom: "Vit. D3", forme: "ampoule", dosages: [], dci: "vitamine D3", categories: ["METABOLISME"] },
        { nom: "Parol fort", forme: "comprimé", dosages: [], dci: "paracetamol", categories: ["ANTALGIQUES"] },
        { nom: "D-three", forme: "ampoule", dosages: [], dci: "vitamine D3", categories: ["METABOLISME"] },
        { nom: "Débridat", forme: "comprimé 100 mg", dosages: ["100 mg"], dci: "trimebutine", categories: ["GASTROLOGIE"] },
        { nom: "Tardyferon", forme: "comprimé", dosages: [], dci: "fer", categories: ["HEMATOLOGIE", "METABOLISME"] },
        { nom: "Vitamine E", forme: "capsule", dosages: [], dci: "tocopherol", categories: ["METABOLISME"] },
        { nom: "Éos-d3", forme: "ampoule", dosages: [], dci: "vitamine D3", categories: ["METABOLISME"] },
        { nom: "Trois b", forme: "comprimé", dosages: [], dci: "multivitamines", categories: ["METABOLISME"] },
        { nom: "Ferro sanil gyn", forme: "gélule", dosages: [], dci: "fer + vitamines", categories: ["HEMATOLOGIE", "METABOLISME"] }
      ],
      colonne2: [
        { nom: "Ferrum", forme: "gouttes", dosages: [], dci: "fer", categories: ["HEMATOLOGIE", "METABOLISME"] },
        { nom: "Rhitene", forme: "gouttes 10 mg", dosages: ["10 mg"], dci: "non précisé", categories: ["PNEUMOLOGIE"] },
        { nom: "Cetirizine", forme: "solution buvable 10 mg", dosages: ["10 mg"], dci: "cetirizine", categories: ["ALLERGOLOGIE"] },
        { nom: "Tardyferon", forme: "comprimé 80 mg", dosages: ["80 mg"], dci: "fer", categories: ["HEMATOLOGIE", "METABOLISME"] },
        { nom: "Neoferon", forme: "comprimé 80 mg", dosages: ["80 mg"], dci: "fer", categories: ["HEMATOLOGIE", "METABOLISME"] },
        { nom: "Tot'héma", forme: "ampoule", dosages: [], dci: "fer", categories: ["HEMATOLOGIE", "METABOLISME"] },
        { nom: "Luterol", forme: "comprimé 5 mg", dosages: ["5 mg"], dci: "albuterol", categories: ["PNEUMOLOGIE"] },
        { nom: "Fumacur", forme: "comprimé 200 mg", dosages: ["200 mg"], dci: "fumarate ferreux", categories: ["HEMATOLOGIE", "METABOLISME"] },
        { nom: "Colchimed", forme: "comprimé 1 mg", dosages: ["1 mg"], dci: "colchicine", categories: ["RHUMATOLOGIE"] },
        { nom: "Hydroxil", forme: "comprimé 25 mg", dosages: ["25 mg"], dci: "vitamine B6", categories: ["METABOLISME"] },
        { nom: "Clamoxyl", forme: "comprimé 1 g", dosages: ["1 g"], dci: "amoxicilline", categories: ["ANTIBIOTIQUES"] }
      ]
    },
    ligne5: {
      colonne1: [
        { nom: "Odesta", forme: "sirop", dosages: [], dci: "paracetamol", categories: ["ANTALGIQUES"] },
        { nom: "Deslor", forme: "sirop 0,5 mg", dosages: ["0,5 mg"], dci: "desloratadine", categories: ["ALLERGOLOGIE"] },
        { nom: "Histagan", forme: "sirop", dosages: [], dci: "diphenhydramine", categories: ["ALLERGOLOGIE"] },
        { nom: "Colostop", forme: "sirop", dosages: [], dci: "loperamide", categories: ["ANTIDIARRHEIQUES"] },
        { nom: "Doramine", forme: "sirop 0,5 mg", dosages: ["0,5 mg"], dci: "diphenhydramine", categories: ["ALLERGOLOGIE"] },
        { nom: "Isoffine", forme: "solution buvable", dosages: [], dci: "isosorbide", categories: ["CARDIOLOGIE"] },
        { nom: "Hydroxil", forme: "sirop 2 mg", dosages: ["2 mg"], dci: "vitamine B6", categories: ["METABOLISME"] },
        { nom: "Resiven", forme: "ampoule", dosages: [], dci: "vitamine C", categories: ["METABOLISME"] },
        { nom: "Toni+C", forme: "ampoule", dosages: [], dci: "vitamine C", categories: ["METABOLISME"] },
        { nom: "Émag", forme: "ampoule", dosages: [], dci: "vitamine C", categories: ["METABOLISME"] },
        { nom: "Physiomag", forme: "ampoule", dosages: [], dci: "magnésium", categories: ["METABOLISME"] },
        { nom: "Cibetaine", forme: "ampoule 2 g", dosages: ["2 g"], dci: "betaïne", categories: ["METABOLISME"] }
      ],
      colonne2: [
        { nom: "Fer 3+", forme: "ampoule", dosages: [], dci: "fer", categories: ["HEMATOLOGIE", "METABOLISME"] },
        { nom: "Frubail", forme: "ampoule", dosages: [], dci: "fer + vitamines", categories: ["HEMATOLOGIE", "METABOLISME"] },
        { nom: "Écitaïne", forme: "ampoule", dosages: [], dci: "vitamines", categories: ["METABOLISME"] },
        { nom: "Vitamag", forme: "ampoule", dosages: [], dci: "vitamines", categories: ["METABOLISME"] },
        { nom: "Arginor", forme: "ampoule 0,8 g", dosages: ["0,8 g"], dci: "arginine", categories: ["METABOLISME"] },
        { nom: "Argéphore", forme: "ampoule", dosages: [], dci: "arginine + vitamines", categories: ["METABOLISME"] },
        { nom: "Veino 3 fort", forme: "ampoule", dosages: [], dci: "diosmine + hesperidine", categories: ["CARDIOLOGIE"] }
      ]
    }
  };

  // Organiser toutes les cases
  const allCases = [
    { name: "Case 1", data: medicationsCase1, hasColumns: true },
    { name: "Case 2", data: medicationsCase2, hasColumns: false },
    { name: "Case 3", data: medicationsCase3, hasColumns: false },
    { name: "Case 4", data: medicationsCase4, hasColumns: true },
    { name: "Case 5", data: medicationsCase5, hasColumns: false },
    { name: "Case 6", data: medicationsCase6, hasColumns: true }
  ];

  // Catégories disponibles
  const categories = [
    { name: "ANTIBIOTIQUES", icon: Shield, color: "from-purple-600 via-pink-500 to-rose-500" },
    { name: "ANTIFONGIQUES", icon: Bug, color: "from-violet-600 via-purple-500 to-fuchsia-500" },
    { name: "ANTIPARASITAIRES", icon: Skull, color: "from-indigo-600 via-purple-500 to-pink-500" },
    { name: "ANTALGIQUES", icon: Thermometer, color: "from-blue-600 via-cyan-500 to-teal-500" },
    { name: "ANTIMIGRAINEUX", icon: Headphones, color: "from-purple-600 via-violet-500 to-indigo-500" },
    { name: "ANTI-INFLAMMATOIRES", icon: Activity, color: "from-pink-600 via-rose-500 to-orange-500" },
    { name: "GASTROLOGIE", icon: HeartPulse, color: "from-emerald-600 via-teal-500 to-cyan-500" },
    { name: "PNEUMOLOGIE", icon: Wind, color: "from-sky-600 via-blue-500 to-indigo-500" },
    { name: "CARDIOLOGIE", icon: Heart, color: "from-rose-600 via-pink-500 to-fuchsia-500" },
    { name: "HEMATOLOGIE", icon: Droplet, color: "from-red-500 via-pink-500 to-rose-500" },
    { name: "DERMATOLOGIE", icon: ActivitySquare, color: "from-green-600 via-emerald-500 to-teal-500" },
    { name: "OPHTALMOLOGIE", icon: Eye, color: "from-blue-500 via-cyan-500 to-teal-500" },
    { name: "RHUMATOLOGIE", icon: Bone, color: "from-amber-600 via-yellow-500 to-orange-500" },
    { name: "METABOLISME", icon: FlaskConical, color: "from-lime-600 via-green-500 to-emerald-500" },
    { name: "TROUBLE GENITO-URINAIRE", icon: Heart, color: "from-indigo-600 via-blue-500 to-cyan-500" },
    { name: "GYNECOLOGIE", icon: Brain, color: "from-pink-600 via-rose-500 to-red-500" },
    { name: "PSYCHIATRIE", icon: Brain, color: "from-violet-600 via-purple-500 to-indigo-500" },
    { name: "NEUROLOGIE", icon: BrainCircuit, color: "from-slate-600 via-gray-500 to-blue-500" },
    { name: "ALLERGOLOGIE", icon: AlertTriangle, color: "from-yellow-500 via-amber-500 to-orange-500" },
    { name: "ANTIDIARRHEIQUES", icon: Syringe, color: "from-amber-600 via-orange-500 to-red-500" }
  ];

  // Fonctions de recherche améliorées pour toutes les cases
  const findPosition = (medName) => {
    const name = medName.toLowerCase().trim();
    
    for (const caseInfo of allCases) {
      const result = searchInCase(name, caseInfo);
      if (result) return result;
    }
    
    return null;
  };

  const searchInCase = (name, caseInfo) => {
    const { name: caseName, data, hasColumns } = caseInfo;
    
    if (hasColumns) {
      for (const [ligne, colonnes] of Object.entries(data)) {
        for (const [colonne, meds] of Object.entries(colonnes)) {
          const found = meds.find(m => m.nom.toLowerCase().includes(name));
          if (found) {
            return {
              medication: found,
              position: `${caseName} - ${ligne.replace('ligne', 'Ligne ')} - ${colonne.replace('colonne', 'Colonne ')}`
            };
          }
        }
      }
    } else {
      for (const [ligne, meds] of Object.entries(data)) {
        const found = meds.find(m => m.nom.toLowerCase().includes(name));
        if (found) {
          return {
            medication: found,
            position: `${caseName} - ${ligne.replace('ligne', 'Ligne ')}`
          };
        }
      }
    }
    
    return null;
  };

  const findByDCI = (searchInput) => {
    const input = searchInput.toLowerCase().trim();
    let targetDCI = input;
    
    for (const caseInfo of allCases) {
      const foundMed = findMedByNameInCase(input, caseInfo);
      if (foundMed) {
        targetDCI = foundMed.dci;
        break;
      }
    }

    const result = [];
    
    for (const caseInfo of allCases) {
      const medsFromCase = findMedsByDCIInCase(targetDCI, caseInfo);
      result.push(...medsFromCase);
    }
    
    return result;
  };

  const findMedByNameInCase = (name, caseInfo) => {
    const { data, hasColumns } = caseInfo;
    
    if (hasColumns) {
      for (const colonnes of Object.values(data)) {
        for (const meds of Object.values(colonnes)) {
          const found = meds.find(m => m.nom.toLowerCase().includes(name));
          if (found) return found;
        }
      }
    } else {
      for (const meds of Object.values(data)) {
        const found = meds.find(m => m.nom.toLowerCase().includes(name));
        if (found) return found;
      }
    }
    
    return null;
  };

  const findMedsByDCIInCase = (targetDCI, caseInfo) => {
    const { name: caseName, data, hasColumns } = caseInfo;
    const result = [];
    
    if (hasColumns) {
      for (const [ligne, colonnes] of Object.entries(data)) {
        for (const [colonne, meds] of Object.entries(colonnes)) {
          meds.forEach(med => {
            if (med.dci.toLowerCase().includes(targetDCI)) {
              result.push({
                ...med,
                position: `${caseName} - ${ligne.replace('ligne', 'Ligne ')} - ${colonne.replace('colonne', 'Colonne ')}`
              });
            }
          });
        }
      }
    } else {
      for (const [ligne, meds] of Object.entries(data)) {
        meds.forEach(med => {
          if (med.dci.toLowerCase().includes(targetDCI)) {
            result.push({
              ...med,
              position: `${caseName} - ${ligne.replace('ligne', 'Ligne ')}`
            });
          }
        });
      }
    }
    
    return result;
  };

  // Fonctions pour les listes par catégorie
  const getMedicationsByCategory = (categoryName) => {
    const result = [];
    
    for (const caseInfo of allCases) {
      const { name: caseName, data, hasColumns } = caseInfo;
      
      if (hasColumns) {
        for (const [ligne, colonnes] of Object.entries(data)) {
          for (const [colonne, meds] of Object.entries(colonnes)) {
            meds.forEach(med => {
              if (med.categories && med.categories.some(cat => 
                cat.toLowerCase() === categoryName.toLowerCase()
              )) {
                result.push({
                  ...med,
                  position: `${caseName} - ${ligne.replace('ligne', 'Ligne ')} - ${colonne.replace('colonne', 'Colonne ')}`
                });
              }
            });
          }
        }
      } else {
        for (const [ligne, meds] of Object.entries(data)) {
          meds.forEach(med => {
            if (med.categories && med.categories.some(cat => 
              cat.toLowerCase() === categoryName.toLowerCase()
            )) {
              result.push({
                ...med,
                position: `${caseName} - ${ligne.replace('ligne', 'Ligne ')}`
              });
            }
          });
        }
      }
    }
    
    // Grouper par DCI
    const grouped = {};
    result.forEach(med => {
      if (!grouped[med.dci]) {
        grouped[med.dci] = [];
      }
      grouped[med.dci].push(med);
    });

    return Object.entries(grouped).map(([dci, meds]) => ({
      dci,
      count: meds.length,
      medications: meds
    })).sort((a, b) => b.count - a.count);
  };

  const handleShowCategory = (categoryName) => {
    const categoryMedications = getMedicationsByCategory(categoryName);
    setCategoryList(categoryMedications);
    setSelectedCategory(categoryName);
  };

  // Fonctions existantes modifiées pour toutes les cases
  const getAllDCIWithMultipleBrands = () => {
    const dciCount = {};
    
    for (const caseInfo of allCases) {
      const { data, hasColumns } = caseInfo;
      
      if (hasColumns) {
        for (const colonnes of Object.values(data)) {
          for (const meds of Object.values(colonnes)) {
            meds.forEach(med => {
              if (!dciCount[med.dci]) {
                dciCount[med.dci] = [];
              }
              dciCount[med.dci].push(med);
            });
          }
        }
      } else {
        for (const meds of Object.values(data)) {
          meds.forEach(med => {
            if (!dciCount[med.dci]) {
              dciCount[med.dci] = [];
            }
            dciCount[med.dci].push(med);
          });
        }
      }
    }

    const multipleBrands = [];
    for (const [dci, meds] of Object.entries(dciCount)) {
      if (meds.length > 1) {
        multipleBrands.push({
          dci: dci,
          count: meds.length,
          medications: meds
        });
      }
    }

    return multipleBrands.sort((a, b) => b.count - a.count);
  };

  const getAllAntibiotics = () => getMedicationsByCategory("ANTIBIOTIQUES");
  const getAllAntiInflammatories = () => getMedicationsByCategory("ANTI-INFLAMMATOIRES");

  const handleShowAllDCI = () => {
    const allDCI = getAllDCIWithMultipleBrands();
    setDciList(allDCI);
  };

  const handleShowAntibiotics = () => {
    const allAntibiotics = getAllAntibiotics();
    setAntibioticsList(allAntibiotics);
    setSelectedCategory("ANTIBIOTIQUES");
  };

  const handleShowAntiInflammatories = () => {
    const allAntiInflams = getAllAntiInflammatories();
    setAntiInflamList(allAntiInflams);
    setSelectedCategory("ANTI-INFLAMMATOIRES");
  };

  const handleSearch = () => {
    if (!searchTerm.trim()) return;

    if (mode === 1) {
      const result = findPosition(searchTerm);
      setResults(result);
    } else if (mode === 2 || mode === 3) {
      const result = findByDCI(searchTerm);
      setResults(result.length > 0 ? result : null);
    }
  };

  // Fonction pour afficher une liste de médicaments par catégorie
  const renderCategoryList = (list, title, color) => (
    <div className="category-list-container space-y-6 max-h-[600px] overflow-y-auto pr-3">
      {list.map((group, idx) => (
        <div key={idx} className="dci-group-card">
          <div className="dci-group-header">
            <h4 className="dci-title">
              <span className="dci-icon">💊</span>
              <span className="dci-name">{group.dci}</span>
            </h4>
            <span className="dci-count-badge">
              {group.count} médicaments
            </span>
          </div>
          <div className="medications-grid">
            {group.medications.map((med, medIdx) => (
              <div key={medIdx} className="medication-item-card">
                <div className="medication-item-name">{med.nom}</div>
                <div className="medication-item-details">
                  <div className="detail-row">
                    <span className="detail-icon">💊</span>
                    <span className="detail-label">Forme :</span>
                    <span className="detail-value">{med.forme}</span>
                  </div>
                  {med.dosages.length > 0 && (
                    <div className="detail-row">
                      <span className="detail-icon">📊</span>
                      <span className="detail-label">Dosages :</span>
                      <span className="detail-value">{med.dosages.join(', ')}</span>
                    </div>
                  )}
                  {med.age && (
                    <div className="detail-row">
                      <span className="detail-icon">👶</span>
                      <span className="detail-label">Âge :</span>
                      <span className="detail-value">{med.age}</span>
                    </div>
                  )}
                  {med.categories && (
                    <div className="detail-row categories-row">
                      <span className="detail-icon">🏷️</span>
                      <div className="categories-list">
                        {med.categories.map((cat, catIdx) => (
                          <span key={catIdx} className="category-tag-small">{cat}</span>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="position-row">
                    <span className="position-icon-small">📌</span>
                    <span className="position-text-small">{med.position}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

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

    // Vérifier si on doit montrer la bannière
    const lastClosed = localStorage.getItem('installBannerClosed');
    if (lastClosed) {
      const daysSinceClosed = (Date.now() - parseInt(lastClosed)) / (1000 * 60 * 60 * 24);
      if (daysSinceClosed < 30) {
        setShowInstallBanner(false);
      }
    }

    // Nettoyer les écouteurs
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Gestion d'erreur pour éviter la page blanche
  if (typeof window === 'undefined') {
    return null;
  }

  return (
    <div className="app-container" style={{ width: '100%', maxWidth: '100%', overflowX: 'hidden' }}>
      
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

      <div className="main-card">
          
          {/* En-tête avec bouton d'installation flottant */}
          <div className="text-center mb-10 relative header-modern">
            <div className="flex items-center justify-center gap-5 mb-5">
              <div className="relative animate-float">
                <Pill className="w-16 h-16 text-white relative z-10 drop-shadow-2xl" style={{filter: 'drop-shadow(0 4px 12px rgba(102, 126, 234, 0.6))'}} />
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 blur-2xl opacity-60 animate-glow -z-0"></div>
              </div>
              <div>
                <h1 className="text-6xl font-black bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 bg-clip-text text-transparent tracking-tight mb-2 header-title">
                  Pharmacy Boudieb
                </h1>
                <div className="h-1 w-full bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 rounded-full opacity-30"></div>
              </div>
            </div>
            <p className="text-3xl text-purple-700 font-extrabold mb-3 location-text">Témouchent</p>
            <div className="w-40 h-2 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 mx-auto mt-5 rounded-full shadow-xl header-divider"></div>
            
            {/* Bouton d'installation flottant (seulement si installable) */}
            {isInstallable && (
              <button
                onClick={handleInstall}
                className="absolute right-0 top-0 bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 hover:from-purple-700 hover:via-pink-600 hover:to-blue-600 text-white px-5 py-2.5 rounded-full shadow-xl hover:shadow-2xl transition-all flex items-center gap-2 group animate-bounce-slow hover:scale-110"
                title="Installer l'application"
              >
                <Download className="w-5 h-5 group-hover:animate-bounce" />
                <span className="hidden sm:inline font-semibold">Installer</span>
                <span className="inline sm:hidden">📱</span>
              </button>
            )}
          </div>

          {/* Badge PWA */}
          <div className="mb-8 flex justify-center">
            <div className="pwa-badge inline-flex items-center gap-3 bg-gradient-to-r from-purple-600/20 via-pink-500/20 to-blue-500/20 backdrop-blur-md text-purple-800 px-6 py-3 rounded-full text-base font-bold shadow-xl border-2 border-purple-300/50">
              <span className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse shadow-lg"></span>
              <span className="pwa-text">PWA • Fonctionne hors ligne</span>
            </div>
          </div>

          {/* Votre contenu principal reste inchangé */}
          {!mode ? (
            <div className="space-y-4">
              <p className="search-intro text-gray-700 mb-8 text-center text-2xl font-bold">🔍 Choisissez votre mode de recherche :</p>
              
              <button
                onClick={() => setMode(1)}
                className="btn btn-blue"
              >
                <MapPin className="w-12 h-12" style={{filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'}} />
                <div className="text-left flex-1">
                  <div className="font-black text-xl mb-1">Option 1 : Localiser un médicament</div>
                  <div className="text-white/90 text-sm font-medium">Trouvez la position exacte (ligne/colonne) dans toutes les cases</div>
                </div>
              </button>

              <button
                onClick={() => setMode(2)}
                className="btn btn-green"
              >
                <Search className="w-12 h-12" style={{filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'}} />
                <div className="text-left flex-1">
                  <div className="font-black text-xl mb-1">Option 2 : Recherche par nom</div>
                  <div className="text-white/90 text-sm font-medium">Trouvez tous les médicaments de même DCI dans toutes les cases</div>
                </div>
              </button>

              <button
                onClick={() => setMode(3)}
                className="btn btn-purple"
              >
                <FileText className="w-12 h-12" style={{filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'}} />
                <div className="text-left flex-1">
                  <div className="font-black text-xl mb-1">Option 3 : Recherche par DCI</div>
                  <div className="text-white/90 text-sm font-medium">Recherchez directement par principe actif</div>
                </div>
              </button>

              <button
                onClick={() => { setMode(4); handleShowAllDCI(); }}
                className="btn btn-orange"
              >
                <Pill className="w-12 h-12" style={{filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'}} />
                <div className="text-left flex-1">
                  <div className="font-black text-xl mb-1">Option 4 : Tous les DCI avec plusieurs noms</div>
                  <div className="text-white/90 text-sm font-medium">Affiche tous les DCI ayant plusieurs médicaments</div>
                </div>
              </button>

              <button
                onClick={() => { setMode(5); handleShowAntibiotics(); }}
                className="btn btn-red"
              >
                <Shield className="w-12 h-12" style={{filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'}} />
                <div className="text-left flex-1">
                  <div className="font-black text-xl mb-1">Option 5 : Tous les Antibiotiques</div>
                  <div className="text-white/90 text-sm font-medium">Liste complète de tous les antibiotiques</div>
                </div>
              </button>

              <button
                onClick={() => { setMode(6); handleShowAntiInflammatories(); }}
                className="btn btn-indigo"
              >
                <Activity className="w-12 h-12" style={{filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'}} />
                <div className="text-left flex-1">
                  <div className="font-black text-xl mb-1">Option 6 : Tous les Anti-inflammatoires</div>
                  <div className="text-white/90 text-sm font-medium">AINS et corticoïdes - Toutes les formes</div>
                </div>
              </button>

              <div className="mt-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">📚 Recherche par catégorie thérapeutique :</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {categories.map((category, idx) => (
                    <button
                      key={idx}
                      onClick={() => { setMode(7); handleShowCategory(category.name); }}
                      className={`btn-category bg-gradient-to-r ${category.color}`}
                      style={{
                        background: `linear-gradient(135deg, ${category.color.split(' ').join(', ')})`,
                        backgroundSize: '200% 200%',
                        animation: 'gradientShift 3s ease infinite'
                      }}
                    >
                      <category.icon className="w-6 h-6" style={{filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))'}} />
                      <span className="font-bold" style={{textShadow: '0 2px 4px rgba(0,0,0,0.7)'}}>{category.name}</span>
                    </button>
                  ))}
                </div>
              </div>

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
              {mode !== 4 && mode !== 5 && mode !== 6 && mode !== 7 && (
                <>
                  <button
                    onClick={() => { setMode(null); setResults(null); setSearchTerm(''); }}
                    className="btn-back mb-6"
                  >
                    ← Retour au menu
                  </button>

                  <div className="mb-6">
                    <label className="block text-gray-700 font-semibold mb-3 text-lg">
                      {mode === 1 && "🔍 Entrez le nom du médicament :"}
                      {mode === 2 && "🔍 Entrez le nom du médicament :"}
                      {mode === 3 && "🔍 Entrez le DCI (principe actif) :"}
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                        placeholder={mode === 3 ? "Ex: paracetamol, ciprofloxacine..." : "Ex: Ciprolon, Doliprane..."}
                        className="search-box-input"
                      />
                      <button
                        onClick={handleSearch}
                        className="btn-search"
                      >
                        🔍 Rechercher
                      </button>
                    </div>
                  </div>
                </>
              )}

              {mode === 4 && (
                <>
                  <button
                    onClick={() => { setMode(null); setDciList([]); }}
                    className="btn-back mb-6"
                  >
                    ← Retour au menu
                  </button>

                  <div className="mt-6">
                    <h3 className="text-3xl font-bold text-emerald-800 mb-3 flex items-center gap-2">
                      <Pill className="w-8 h-8" /> Liste complète des DCI
                    </h3>
                    <div className="category-total-card">
                      <span className="total-icon">📊</span>
                      <span className="total-text">
                        Total : <span className="total-number">{dciList.length} DCI</span> trouvés avec plusieurs médicaments
                      </span>
                    </div>

                    {renderCategoryList(dciList, "DCI avec plusieurs noms", "from-orange-50 via-amber-50 to-yellow-50")}
                  </div>
                </>
              )}

              {mode === 6 && (
                <>
                  <button
                    onClick={() => { setMode(null); setAntiInflamList([]); }}
                    className="btn-back mb-6"
                  >
                    ← Retour au menu
                  </button>

                  <div className="mt-6">
                    <h3 className="text-3xl font-bold text-indigo-800 mb-3 flex items-center gap-2">
                      🔥 Tous les Anti-inflammatoires
                    </h3>
                    <div className="category-total-card">
                      <span className="total-icon">💊</span>
                      <span className="total-text">
                        Total : <span className="total-number">{antiInflamList.reduce((sum, group) => sum + group.count, 0)} anti-inflammatoires</span> dans <span className="total-number">{antiInflamList.length} familles</span>
                      </span>
                    </div>

                    {renderCategoryList(antiInflamList, "Anti-inflammatoires", "from-indigo-50 via-purple-50 to-pink-50")}
                  </div>
                </>
              )}

              {mode === 5 && (
                <>
                  <button
                    onClick={() => { setMode(null); setAntibioticsList([]); }}
                    className="btn-back mb-6"
                  >
                    ← Retour au menu
                  </button>

                  <div className="mt-6">
                    <h3 className="text-3xl font-bold text-red-800 mb-3 flex items-center gap-2">
                      🦠 Tous les Antibiotiques
                    </h3>
                    <div className="category-total-card">
                      <span className="total-icon">💊</span>
                      <span className="total-text">
                        Total : <span className="total-number">{antibioticsList.reduce((sum, group) => sum + group.count, 0)} antibiotiques</span> dans <span className="total-number">{antibioticsList.length} familles</span>
                      </span>
                    </div>

                    {renderCategoryList(antibioticsList, "Antibiotiques", "from-red-50 via-rose-50 to-pink-50")}
                  </div>
                </>
              )}

              {mode === 7 && (
                <>
                  <button
                    onClick={() => { setMode(null); setCategoryList([]); setSelectedCategory(''); }}
                    className="btn-back mb-6"
                  >
                    ← Retour au menu
                  </button>

                  <div className="mt-6">
                    <h3 className="text-3xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                      {(() => {
                        const category = categories.find(c => c.name === selectedCategory);
                        return category ? (
                          <>
                            <category.icon className="w-8 h-8" /> {selectedCategory}
                          </>
                        ) : (
                          <>📚 {selectedCategory}</>
                        );
                      })()}
                    </h3>
                    <div className="category-total-card">
                      <span className="total-icon">💊</span>
                      <span className="total-text">
                        Total : <span className="total-number">{categoryList.reduce((sum, group) => sum + group.count, 0)} médicaments</span> dans <span className="total-number">{categoryList.length} familles</span>
                      </span>
                    </div>

                    {renderCategoryList(categoryList, selectedCategory, "from-gray-50 via-blue-50 to-cyan-50")}
                  </div>
                </>
              )}

              {results && (
                <div className="mt-6 result-container">
                  {mode === 1 && results && (
                    <div className="result-card-modern">
                      <h3 className="result-title-modern">
                        <MapPin className="w-8 h-8" /> Résultat trouvé :
                      </h3>
                      <div className="medication-card">
                        <div className="medication-name">{results.medication.nom}</div>
                        <div className="medication-info">
                          <div className="info-item">
                            <span className="info-label">💊 Forme :</span> 
                            <span className="info-value">{results.medication.forme}</span>
                          </div>
                          <div className="info-item">
                            <span className="info-label">📊 Dosages :</span> 
                            <span className="info-value">{results.medication.dosages.join(', ')}</span>
                          </div>
                          <div className="info-item">
                            <span className="info-label">🔬 DCI :</span> 
                            <span className="info-value dci-text">{results.medication.dci}</span>
                          </div>
                          {results.medication.categories && (
                            <div className="info-item">
                              <span className="info-label">🏷️ Catégories :</span> 
                              <div className="categories-container">
                                {results.medication.categories.map((cat, idx) => (
                                  <span key={idx} className="category-badge">{cat}</span>
                                ))}
                              </div>
                            </div>
                          )}
                          <div className="position-card">
                            <span className="position-icon">📌</span>
                            <span className="position-text">Position : {results.position}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {(mode === 2 || mode === 3) && Array.isArray(results) && results.length > 0 && (
                    <div>
                      <h3 className="text-2xl font-bold text-emerald-800 mb-4 flex items-center gap-2">
                        <Pill className="w-6 h-6" /> Médicaments trouvés ({results.length})
                      </h3>
                      <div className="mb-4 p-3 bg-white rounded-lg shadow-md">
                        <span className="font-semibold text-gray-700">🔬 DCI : </span>
                        <span className="text-emerald-700 font-bold text-lg uppercase">{results[0].dci}</span>
                      </div>
                      <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                        {results.map((med, idx) => (
                          <div key={idx} className="bg-white p-4 rounded-xl shadow-md border-l-4 border-teal-500 hover:shadow-lg transition-shadow">
                            <div className="font-bold text-xl text-teal-700 mb-2">{med.nom}</div>
                            <div className="text-gray-700 text-sm space-y-1">
                              <div className="flex items-start gap-2">
                                <span className="font-medium text-teal-600">💊</span>
                                <span><span className="font-medium">Forme :</span> {med.forme}</span>
                              </div>
                              {med.dosages.length > 0 && (
                                <div className="flex items-start gap-2">
                                  <span className="font-medium text-teal-600">📊</span>
                                  <span><span className="font-medium">Dosages :</span> {med.dosages.join(', ')}</span>
                                </div>
                              )}
                              {med.age && (
                                <div className="flex items-start gap-2">
                                  <span className="font-medium text-teal-600">👶</span>
                                  <span><span className="font-medium">Âge :</span> {med.age}</span>
                                </div>
                              )}
                              {med.categories && (
                                <div className="flex items-start gap-2">
                                  <span className="font-medium text-teal-600">🏷️</span>
                                  <div className="flex flex-wrap gap-1">
                                    {med.categories.map((cat, catIdx) => (
                                      <span key={catIdx} className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded">
                                        {cat}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}
                              <div className="mt-2 text-emerald-600 font-semibold text-sm">
                                📌 {med.position}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {results === null && searchTerm && (
                <div className="mt-6 p-5 bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-300 text-red-700 rounded-xl shadow-md">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">❌</span>
                    <div>
                      <div className="font-bold text-lg">Aucun résultat trouvé</div>
                      <div className="text-sm">Vérifiez l'orthographe de "{searchTerm}"</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
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
      <div className="pwa-footer mt-10 text-center">
        <div className="pwa-footer-content">
          <span className="pwa-status-dot"></span>
          <span className="pwa-footer-text">
            PWA • Version 1.0 • {isOffline ? 'Hors ligne' : 'En ligne'}
            {isInstallable && ' • Prêt à installer'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PharmacyApp;