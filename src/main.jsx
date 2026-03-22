import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

// Storage polyfill — replaces Claude's window.storage API with localStorage
// This is what makes the app work outside of Claude's artifact environment
if (!window.storage) {
  window.storage = {
    async get(key, shared = false) {
      const prefix = shared ? 'shared:' : 'local:';
      const val = localStorage.getItem(prefix + key);
      if (val === null) throw new Error('Key not found');
      return { key, value: val, shared };
    },
    async set(key, value, shared = false) {
      const prefix = shared ? 'shared:' : 'local:';
      localStorage.setItem(prefix + key, value);
      return { key, value, shared };
    },
    async delete(key, shared = false) {
      const prefix = shared ? 'shared:' : 'local:';
      localStorage.removeItem(prefix + key);
      return { key, deleted: true, shared };
    },
    async list(prefix = '', shared = false) {
      const storePrefix = shared ? 'shared:' : 'local:';
      const keys = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k.startsWith(storePrefix + prefix)) {
          keys.push(k.slice(storePrefix.length));
        }
      }
      return { keys, prefix, shared };
    },
  };
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
