import React from 'react';
import { Scene, Router } from 'react-native-router-flux';

import MainMenu from './components/MainMenu';
import LearnMenu from './components/LearnMenu';
import QuestionPage from './components/QuestionPage';
import ResultPage from './components/ResultPage';
import startPage from './components/startPage';

const RouterComponent = () => {
    return (
        <Router navigationBarStyle={styles.viewStyle} >
            <Scene key="root" titleStyle={styles.titleStyle}>
                <Scene key="menu" title="Menü" component={MainMenu} initial />
                <Scene key="test" title="Tests" component={startPage} />
                <Scene key="learn" title="Lernen" component={LearnMenu} />

                <Scene 
                    key="quest" 
                    title="Prüfung" 
                    component={QuestionPage} 
                />
                <Scene key="result" title="Ergebnis" component={ResultPage} />
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
