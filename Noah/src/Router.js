import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';

import MainMenu from './components/MainMenu';
import TestMenu from './components/TestMenu';
import LearnMenu from './components/LearnMenu';
import Quest from './components/Questions';
import Result from './components/Result';

const RouterComponent = () => {
    return (
        <Router navigationBarStyle={styles.viewStyle} >
            <Scene key="root" titleStyle={styles.titleStyle}>
                <Scene key="menu" title="Menü" component={MainMenu} initial />
                <Scene key="test" title="Tests" component={TestMenu} />
                <Scene key="learn" title="Lernen" component={LearnMenu} />

                <Scene 
                    key="quest" 
                    title="Prüfung" 
                    rightTitle="Check"
                    onRight={() => Actions.result()}
                    component={Quest} 
                />
                <Scene key="result" title="Ergebnis" component={Result} />
            </Scene>
             
        </Router>
    );
};

const styles = {
    viewStyle: {
        backgroundColor: '#1562E7',
        paddingTop: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        elevation: 2,
        marginBottom: 10 
    },
    titleStyle: {
        alignSelf: 'center',
      fontSize: 40,
      color: '#FFFFFF',

    }
  };

export default RouterComponent;
