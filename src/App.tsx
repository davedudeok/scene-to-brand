import React from 'react';

export default function App() {
  return React.createElement('div', { id: 'app', className: 'p-8' },
    React.createElement('h1', { className: 'text-3xl font-bold' }, 'Hello World')
  );
}
