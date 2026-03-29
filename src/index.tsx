import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

console.log('Mounting React...');

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  console.log('Root found:', container);
  root.render(<App />);
  console.log('Render triggered');
} else {
  console.error('Root container not found!');
}
