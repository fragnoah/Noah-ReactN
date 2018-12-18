import React from 'react';
import { Scene, Router } from 'react-native-router-flux';

import MainMenu from './components/MainMenu';
import LearnMenu from './components/LearnMenu';
import QuestionPage from './components/QuestionPage';
import Result from './components/Result';
import startPage from './components/startPage';
import learnbasic from './components/LearnBasic';
import learnbinnen from './components/LearnBinnen';
import learnsegel from './components/LearnSegel';
import { toResult } from './actions';
import RepeatPage from './components/RepeatPage';
import markedQuestion from './components/markedQuestion';


const RouterComponent = () => {
    //read();
    
    return (
        <Router navigationBarStyle={styles.viewStyle} >
            <Scene key="root" titleStyle={styles.titleStyle}>
                <Scene key="menu" title="Menü" component={MainMenu} initial />
                <Scene key="test" title="Tests" component={startPage} />
                <Scene key="learn" title="Lernen" component={LearnMenu} />

                <Scene 
                    key="quest" 
                    title="Prüfung"
                    rightTitle="Check"
                    onRight={toResult} 
                    component={QuestionPage}                     
                />
                <Scene key="result" title="Ergebnis" component={Result} />
                <Scene key="mark" title="Makierte Fragen" component={markedQuestion} />
                <Scene key="repeat" title="Wiederholung" component={RepeatPage} />
                <Scene key="learnbasic" title="Basisfragen" component={learnbasic} />
                <Scene key="learnbinnen" title="Binnenfragen" component={learnbinnen} />
                <Scene key="learnsegel" title="Segelfragen" component={learnsegel} />
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
