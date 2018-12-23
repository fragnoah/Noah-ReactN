import React, { Component } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { Platform } from 'react-native';
import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
//import Thunk from 'redux-thunk';
import Router from './Router';
import reducers from './reducers';

const persistConfig = {
    key: 'root',
    storage,
};
const persistedReducer = persistReducer(persistConfig, reducers);

//const store = compose(persistedReducer, {}, applyMiddleware(Thunk));

class App extends Component {
    constructor() {
        super();
        console.log('OS: ', Platform.OS, ' (', Platform.Version, ')');
        if (Platform.OS === 'android') {
            console.log('Trying to show');
            SplashScreen.show();
        }
    }

    componentWillMount() {
        // https://github.com/crazycodeboy/react-native-splash-screen
        //if (Platform.OS === 'android') SplashScreen.show();
    }

    componentDidMount() {
        // https://github.com/crazycodeboy/react-native-splash-screen
        // do stuff while splash screen is shownc
        // After having done stuff (such as async tasks) hide the splash screen        
        if (Platform.OS === 'android') {
            SplashScreen.hide();
        }
    }

    render() {
        const store = createStore(persistedReducer);
        const persistor = persistStore(store);
        return (
            <Provider store={store}>
                <PersistGate persistor={persistor}>
                    <Router />
                </PersistGate>
            </Provider>
        );
    }
}

export default App;
