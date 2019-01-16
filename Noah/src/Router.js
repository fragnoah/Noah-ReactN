import React, { Component } from 'react';
import { Scene, Router } from 'react-native-router-flux';
import {
    ImageBackground,
    //Image,
    //View,
    Platform
} from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';

import MainMenu from './components/MainMenu';
import LearnMenu from './components/LearnMenu';
import QuestionPage from './components/QuestionPage';
import Result from './components/Result';
import StartPage from './components/StartPage';
import learnbasic from './components/LearnBasic';
import learnbinnen from './components/LearnBinnen';
import learnsegel from './components/LearnSegel';
import { 
    toMain, 
    toResult, 
    startInfo,
    resultInfo
 } from './actions';
import RepeatPage from './components/RepeatPage';

import MarkedQuestion from './components/MarkedQuestion';
import RepeatAll from './components/RepeatAll';

import GlossarList from './components/GlossarList';
import VideoList from './components/VideoList';
import * as img from './assets/img';
import { styles } from './components/styleSheets/Router';

/**
 * @brief Routing der verschiedenen Pages
 * @author Matthias Cohn
 */
class RouterComponent extends Component {

    /**
     * @brief Handling des transparenten Background für iOS
     */
    renderIOS() {
        return (
            <ImageBackground
                source={img.wallPaper}
                style={styles.backgroundImage}
            >
                <Router
                    navigationBarStyle={styles.viewNavBarStyle}
                    sceneStyle={styles.sceneStyleIOS}
                    // getSceneStyle={() => ({ backgroundColor: 'transparent' })}
                    // Transparent funktioniert unter iOS nicht
                >
                    {this.renderScenes()}
                </Router>
            </ImageBackground>

        );
    }

    renderAndroid() {
        return (
            <ImageBackground
                source={img.wallPaper}
                style={styles.backgroundImage}
            >
                <Router
                    navigationBarStyle={styles.viewNavBarStyle}
                    sceneStyle={styles.sceneStyle}
                >
                    {this.renderScenes()}
                </Router>
            </ImageBackground>
        );
    }

     /**
     * @brief Pages werden als Scene eingebunden
     */
    renderScenes() {
        return (
            <Scene key="root" hideNavBar titleStyle={styles.titleStyle}>
                <Scene key="main" initial>
                    <Scene 
                        key="menu" 
                        title="Menü"    
                        component={MainMenu} 
                        renderBackButton={() => (null)}
                        onRight={startInfo}
                        rightButtonImage={img.infoButton}
                        rightButtonIconStyle={styles.infImageButton}
                        rightButtonStyle={styles.infButtonStyle}
                        initial 
                    />
                </Scene>
                
                <Scene key="exam">
                    <Scene 
                        key="test" 
                        title="Prüfungsmodus"
                        component={StartPage}
                        onLeft={toMain}
                        leftButtonImage={img.leftButton}
                        leftButtonIconStyle={styles.leftImageButton}
                        leftButtonStyle={styles.navImageButtonStyle}
                        initial 
                    />
                </Scene>
                
                <Scene key="doExam">
                    <Scene
                        key="quest"
                        title="Prüfung"
                        renderBackButton={() => (null)}
                        onRight={toMain} 
                        rightTitle='Abbrechen' 
                        component={QuestionPage}  
                        rightButtonTextStyle={{ color: 'white', fontSize: 14 }}  
                        initial                 
                    />
                </Scene>
                
                <Scene key="resultPages">
                    <Scene
                        key="result"
                        title="Ergebnis"
                        component={Result}
                        renderBackButton={() => (null)}
                        onRight={resultInfo}
                        rightButtonImage={img.infoButton}
                        rightButtonIconStyle={styles.infImageButton}
                        rightButtonStyle={styles.infButtonStyle}
                        initial
                    />
                </Scene>
                <Scene key="marked">
                    <Scene 
                        key="mark" 
                        title="markierte Fragen" 
                        component={MarkedQuestion} 
                        renderBackButton={() => (null)}
                        onLeft={toResult}
                        leftButtonImage={img.leftButton}
                        leftButtonIconStyle={styles.leftImageButton}
                        leftButtonStyle={styles.navImageButtonStyle}
                        initial
                    />
                </Scene>
                <Scene key="repeatAll">
                    <Scene 
                        key="all" 
                        title="Wiederholung" 
                        component={RepeatAll}
                        renderBackButton={() => (null)}
                        onLeft={toResult}
                        leftButtonImage={img.leftButton}
                        leftButtonIconStyle={styles.leftImageButton}
                        leftButtonStyle={styles.navImageButtonStyle}
                        initial 
                    />
                </Scene>
                <Scene key="repeatWrong">
                    <Scene 
                        key="repeat" 
                        title="Wiederholung" 
                        component={RepeatPage} 
                        renderBackButton={() => (null)}
                        onLeft={toResult}
                        leftButtonImage={img.leftButton}
                        leftButtonIconStyle={styles.leftImageButton}
                        leftButtonStyle={styles.navImageButtonStyle}
                        initial
                    />
                </Scene>

                <Scene key="prepare"> 
                    <Scene 
                        key="learn" 
                        title="Lernen" 
                        component={LearnMenu} 
                        onLeft={toMain}
                        leftButtonImage={img.leftButton}
                        leftButtonIconStyle={styles.leftImageButton}
                        leftButtonStyle={styles.navImageButtonStyle}
                        initial 
                    />
                    <Scene 
                        key="learnbasic" 
                        title="Basisfragen" 
                        component={learnbasic} 
                        backButtonImage={img.backButton}
                    />
                    <Scene 
                        key="learnbinnen" 
                        title="Binnenfragen" 
                        component={learnbinnen} 
                        backButtonImage={img.backButton}
                    />
                    <Scene 
                        key="learnsegel" 
                        title="Segelfragen" 
                        component={learnsegel} 
                        backButtonImage={img.backButton}
                    />
                    <Scene 
                        key="glossar" 
                        title="Glossar" 
                        component={GlossarList} 
                        backButtonImage={img.backButton}
                    />
                    <Scene 
                        key="videos" 
                        title="Videos" 
                        component={VideoList} 
                        backButtonImage={img.backButton}
                    />
                </Scene>
            </Scene>
        );
    }

    render() {
        if (Platform.OS === 'android') {
            return (
                this.renderAndroid()
            );
        }
        if (Platform.OS === 'ios') {
            return (
                this.renderIOS()
            );
        }
    }
}

export default RouterComponent;
