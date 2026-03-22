import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, setDoc, deleteDoc, collection, getDocs } from 'firebase/firestore';

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBRUHnDsPguDLq-Jm9pjzlINyjUv_iaoL8",
  authDomain: "ironlog-85b43.firebaseapp.com",
  projectId: "ironlog-85b43",
  storageBucket: "ironlog-85b43.firebasestorage.app",
  messagingSenderId: "284656094138",
  appId: "1:284656094138:web:715819d391f78ae8aaab83"
};

const fireApp = initializeApp(firebaseConfig);
const db = getFirestore(fireApp);

/*
  How it works:
  - shared: false → localStorage (your routines, workouts, settings — private to your browser)
  - shared: true  → Firebase Firestore (posts, profiles — visible to ALL users everywhere)
  
  This means when you post a workout, your friend on their phone sees it instantly.
  But your personal routines and workout history stay private on your device.
*/

window.storage = {
  async get(key, shared = false) {
    if (!shared) {
      const val = localStorage.getItem('local:' + key);
      if (val === null) throw new Error('Key not found');
      return { key, value: val, shared };
    }
    try {
      const snap = await getDoc(doc(db, 'shared', key));
      if (!snap.exists()) throw new Error('Key not found');
      return { key, value: snap.data().value, shared: true };
    } catch (e) {
      throw e;
    }
  },

  async set(key, value, shared = false) {
    if (!shared) {
      localStorage.setItem('local:' + key, value);
      return { key, value, shared };
    }
    try {
      await setDoc(doc(db, 'shared', key), { value, updatedAt: Date.now() });
      return { key, value, shared: true };
    } catch (e) {
      console.error('Firebase write error:', e);
      return null;
    }
  },

  async delete(key, shared = false) {
    if (!shared) {
      localStorage.removeItem('local:' + key);
      return { key, deleted: true, shared };
    }
    try {
      await deleteDoc(doc(db, 'shared', key));
      return { key, deleted: true, shared: true };
    } catch (e) {
      console.error('Firebase delete error:', e);
      return null;
    }
  },

  async list(prefix = '', shared = false) {
    if (!shared) {
      const keys = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k.startsWith('local:' + prefix)) keys.push(k.slice(6));
      }
      return { keys, prefix, shared };
    }
    try {
      const snap = await getDocs(collection(db, 'shared'));
      const keys = [];
      snap.forEach(d => { if (d.id.startsWith(prefix)) keys.push(d.id); });
      return { keys, prefix, shared: true };
    } catch (e) {
      console.error('Firebase list error:', e);
      return { keys: [], prefix, shared: true };
    }
  },
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
