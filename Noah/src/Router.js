import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import startPage from './components/startPage';
import QuestionPage from './components/QuestionPage';


const RouterComponent = () => {
    return (
        <Router>
            <Scene key="root">
                <Scene key="startPage" component={startPage} title="start Page" initial />
                    <Scene key="QuestionPage" component={QuestionPage} title="Fragebogen" />
            </Scene>
        </Router>
    );
};

export default RouterComponent;
