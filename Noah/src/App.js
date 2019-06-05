import React, { Component } from 'react';
import { Platform } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
//import Thunk from 'redux-thunk';
import Router from './Router';
import reducers from './reducers';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['selectedFb', 'learn']
};
const persistedReducer = persistReducer(persistConfig, reducers);

/**
 * Start-Component, beim Starten der App
 * Hierbei Wir Redux-Persist im Render() initialisiert
 * Damit wird Redux-Store wiederhergestellt
 * Somit Speicherung von Fragebögen möglich 
 * @author Timur Burkholz
 */
class App extends Component {
    

    render() {
        const store = createStore(persistedReducer);
        const persistor = persistStore(store);
        return (
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <Router />
                </PersistGate>
            </Provider>
        );
    }
}

export default App;
