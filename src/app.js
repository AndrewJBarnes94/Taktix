import React from 'react';
import { createRoot } from 'react-dom/client';  // New import from React 18
import TaktItem from './components/TaktItem';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <div>
      <TaktItem />
    </div>
  </React.StrictMode>
);
