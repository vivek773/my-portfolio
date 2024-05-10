// Main entry

// Default
import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';

// App
import App from './App';

// Redux
import { store, persistor } from './store';
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/es/integration/react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);

reportWebVitals();
