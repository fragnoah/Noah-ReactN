import React, { Component } from 'react';
<<<<<<< HEAD
=======
import SplashScreen from 'react-native-splash-screen';
>>>>>>> ddbf39451b640ee054f42f7cbf2fc3e34072a99e
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers';
import Router from './Router';


class App extends Component {
    constructor() {
        super();
        SplashScreen.show();
    }

    componentWillMount() {
        // https://github.com/crazycodeboy/react-native-splash-screen
        //SplashScreen.show();
    }

    componentDidMount() {
        // https://github.com/crazycodeboy/react-native-splash-screen
    	// do stuff while splash screen is shownc
        // After having done stuff (such as async tasks) hide the splash screen
        SplashScreen.hide();
    }

    render() {
        return (
            
            <Provider store={createStore(reducers)}>
                <Router />
            </Provider>
        );
    }
}

export default App;

