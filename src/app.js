import React from 'react';
import { createRoot } from 'react-dom/client';  // New import from React 18
import CreateAccountForm from './components/CreateAccountForm';

const container = document.getElementById('root');
const root = createRoot(container); // Create a root.

root.render(
  <React.StrictMode>
    <div>
      <CreateAccountForm />
    </div>
  </React.StrictMode>
);
