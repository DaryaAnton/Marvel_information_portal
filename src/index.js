import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
import App from './components/app/App';
import "./style/style.scss";
// import MarvelService from './services/MarvelService';

// const marvelService = new MarvelService();
// marvelService.getAllCharacters().then(res => res.data.results.forEach(item => console.log(item.id)))

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
