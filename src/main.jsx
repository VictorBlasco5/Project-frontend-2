import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'

//REDUX

import { Provider } from "react-redux";
import store from "./app/store.js";

//REDUX PERSISTENCE

import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

//INSTANCIA PERSISTOR

const persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)
