import { createRoot } from 'react-dom/client';
import App from './App';
import store from "./store/store"
import { Provider } from 'react-redux';
import './index.css';
const container = document.getElementById('root');
const root = createRoot(container); 

root.render(
 
    <Provider store={store}>
      <App />
    </Provider>
 
);