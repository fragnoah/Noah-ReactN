import React from 'react';
import { Scene, Router } from 'react-native-router-flux';

import MainMenu from './components/MainMenu';
import LearnMenu from './components/LearnMenu';
import QuestionPage from './components/QuestionPage';
<<<<<<< HEAD
import ResultPage from './components/ResultPage';
import startPage from './components/startPage';
=======
import Result from './components/Result';
import startPage from './components/startPage';
import learnbasic from './components/LearnBasic';
import learnbinnen from './components/LearnBinnen';
import learnsegel from './components/LearnSegel';
import { toResult } from './actions';
>>>>>>> ddbf39451b640ee054f42f7cbf2fc3e34072a99e

const RouterComponent = () => {
    return (
        <Router navigationBarStyle={styles.viewStyle} >
            <Scene key="root" titleStyle={styles.titleStyle}>
                <Scene key="menu" title="Menü" component={MainMenu} initial />
                <Scene key="test" title="Tests" component={startPage} />
                <Scene key="learn" title="Lernen" component={LearnMenu} />

                <Scene 
                    key="quest" 
<<<<<<< HEAD
                    title="Prüfung" 
                    component={QuestionPage} 
                />
                <Scene key="result" title="Ergebnis" component={ResultPage} />
=======
                    title="Prüfung"
                    rightTitle="Check"
                    onRight={toResult} 
                    component={QuestionPage}                     
                />
                <Scene key="result" title="Ergebnis" component={Result} />
                <Scene key="learnbasic" title="Basisfragen" component={learnbasic} />
                <Scene key="learnbinnen" title="Binnenfragen" component={learnbinnen} />
                <Scene key="learnsegel" title="Segelfragen" component={learnsegel} />
>>>>>>> ddbf39451b640ee054f42f7cbf2fc3e34072a99e
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
