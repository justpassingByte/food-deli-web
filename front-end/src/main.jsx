import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'; // Import Provider from react-redux
import store from './redux/Store'; // Import the Redux store

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}> {/* Wrap App in Provider with store */}
        <App />
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
