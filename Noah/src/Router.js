import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import { ImageBackground } from 'react-native';

import MainMenu from './components/MainMenu';
import LearnMenu from './components/LearnMenu';
import QuestionPage from './components/QuestionPage';
import Result from './components/Result';
import startPage from './components/startPage';
import learnbasic from './components/LearnBasic';
import learnbinnen from './components/LearnBinnen';
import learnsegel from './components/LearnSegel';
import { toTests } from './actions';
import RepeatPage from './components/RepeatPage';

import markedQuestion from './components/markedQuestion';
import RepeatAll from './components/RepeatAll';

import GlossarList from './components/GlossarList';
import VideoList from './components/VideoList';

const RouterComponent = () => {
    return (
        <ImageBackground
            source={require('./assets/img/NOAH_Wallpaper.png')}
            style={styles.backgroundImage}
        >
            <Router
                navigationBarStyle={styles.viewStyle}
                sceneStyle={styles.sceneStyle}
                getSceneStyle={() => ({ backgroundColor: 'transparent' })}
            >
                <Scene key="root" titleStyle={styles.titleStyle}>
                    <Scene key="menu" title="Menü" component={MainMenu} initial />
                    <Scene key="test" title="Tests" component={startPage} />
                    <Scene key="learn" title="Lernen" component={LearnMenu} />

                    <Scene
                        key="quest"
                        title="Prüfung"
                        onLeft={toTests}
                        leftTitle='Abbrechen'
                        component={QuestionPage}
                    />

                    <Scene
                    key="result"
                    title="Ergebnis"
                    onLeft={toTests}
                    leftTitle='Start'
                    component={Result}
                    />

                    <Scene key="mark" title="Makierte Fragen" component={markedQuestion} />
                    <Scene key="all" title="Wiederholung" component={RepeatAll} />
                    <Scene key="repeat" title="Wiederholung" component={RepeatPage} />
                    <Scene key="learnbasic" title="Basisfragen" component={learnbasic} />
                    <Scene key="learnbinnen" title="Binnenfragen" component={learnbinnen} />
                    <Scene key="learnsegel" title="Segelfragen" component={learnsegel} />
                    <Scene key="glossar" title="Glossar" component={GlossarList} />
                    <Scene key="videos" title="Videos" component={VideoList} />
                </Scene>

            </Router>
        </ImageBackground>
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
      fontSize: 25,
      color: '#FFFFFF',
    },
    sceneStyle: {
        backgroundColor: '#00000000',
    },
    backgroundImage: {
        zIndex: -1,
        flex: 1,
        resizeMode: 'stretch',
        width: null,
        height: null
    }
  };

export default RouterComponent;
