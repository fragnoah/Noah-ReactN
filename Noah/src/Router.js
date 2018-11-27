import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import startPage from './components/startPage';
import QuestionPage from './components/QuestionPage';
import ResultPage from './components/ResultPage';


const RouterComponent = () => {
    return (
        <Router>
            <Scene key="root">
                <Scene key="startPage" component={startPage} title="start Page" initial />
                    <Scene key="QuestionPage" component={QuestionPage} title="Fragebogen" />
                        <Scene key="QuestionTest" component={ResultPage} title="Result" /> 
            </Scene>
        </Router>
    );
};

export default RouterComponent;
