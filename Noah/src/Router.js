import React, { Component } from 'react';
import { Scene, Router } from 'react-native-router-flux';
import {
    //ImageBackground,
    //Image,
    //View,
    Text,
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
// import IntroSlider from './components/IntroSlider';
import { 
    toMain, 
    toResult, 
    startInfo,
    resultInfo
 } from './actions';
import RepeatPage from './components/RepeatPage';

import MarkedQuestion from './components/MarkedQuestion';
import RepeatAll from './components/RepeatAll';

import Videos2List from './components/Videos2List';
import GlossarList from './components/GlossarList_New_Try';
import VideoList from './components/VideoList';
import * as img from './assets/img';
import { styles } from './components/styleSheets/Router';
import Fragekatalog from './components/Fragekatalog';
import LearnStartPage from './components/LearnStartPage';
import LearnQuestionPage from './components/LearnQuestionPage';
import Icon from 'react-native-vector-icons/FontAwesome';


const TabIcon = ({ title }) => {
    return (
        <Text style={{ fontWeight: 'bold', color: 'black' }}>{title}</Text>
    );
}

/**
 * @brief Hierarchie der Scenen und Tab-Gruppierung
 * @author Vickry Mukhtar
 */
class RouterComponent extends Component {

    /**
     * @brief Handling des transparenten Background für iOS
     */
    
    renderIOS() {
        return (
                <Router
                    navigationBarStyle={styles.viewNavBarStyle}
                    //sceneStyle={styles.sceneStyleIOS}
                    // getSceneStyle={() => ({ backgroundColor: 'transparent' })}
                    // Transparent funktioniert unter iOS nicht
                >
                    {this.renderScenes()}
                </Router>
        );
    }

    renderAndroid() {
        return (
                <Router
                    navigationBarStyle={styles.viewNavBarStyle}
                    sceneStyle={styles.sceneStyle}
                >


                    {this.renderScenes()}
                </Router>
        );
    }
     /**
     * @brief Pages werden als Scene eingebunden
     */
    renderScenes() {
        return (
            <Scene 
            key="root" 
            tabs={true}
            tabBarStyle={{ backgroundColor: '#FFFFFF'}}
            hideNavBar 
            titleStyle={styles.titleStyle}
            tabBarStyle={styles.tabBarStyle}
            >
                    
            
            <Scene key="main" title="Start" icon={TabIcon} 
                //hideNavBar
                 initial>
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

            <Scene key="glossary" title="Lexikon" icon={TabIcon}> 
                    <Scene 
                        key="glossar" 
                        title="Glossar" 
                        component={GlossarList} 
                        onLeft={toMain}
                        leftButtonImage={img.leftButton}
                        leftButtonIconStyle={styles.leftImageButton}
                        leftButtonStyle={styles.navImageButtonStyle}
                        initial 
                    />
            </Scene>

            <Scene key="videos2" title="Videos" icon={TabIcon}> 
                    <Scene 
                        key="videos2" 
                        title="Videos2" 
                        component={Videos2List} 
                        onLeft={toMain}
                        leftButtonImage={img.leftButton}
                        leftButtonIconStyle={styles.leftImageButton}
                        leftButtonStyle={styles.navImageButtonStyle}
                        initial 
                    />

                    <Scene key="video"> 
                        <Scene 
                        key="videos" 
                        title="Videos" 
                        component={VideoList} 
                        onLeft={toMain}
                        leftButtonImage={img.leftButton}
                        leftButtonIconStyle={styles.leftImageButton}
                        leftButtonStyle={styles.navImageButtonStyle}
                        initial 
                        />
                    </Scene>
            </Scene>

            <Scene key="learnStart" title="Lernen" icon={TabIcon}>
                    <Scene 
                        key="learnStart" 
                        title="Learnmodus"
                        component={LearnStartPage}
                        onLeft={toMain}
                        leftButtonImage={img.leftButton}
                        leftButtonIconStyle={styles.leftImageButton}
                        leftButtonStyle={styles.navImageButtonStyle}
                        initial 
                    />

                    <Scene key="learnExam">
                        <Scene 
                        key="learnExam" 
                        title="Fragenbögen lernen"
                        component={LearnQuestionPage}
                        onLeft={toMain}
                        leftButtonImage={img.leftButton}
                        leftButtonIconStyle={styles.leftImageButton}
                        leftButtonStyle={styles.navImageButtonStyle}
                        initial 
                        hideNavBar
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
                        hideNavBar
                        />
                        <Scene 
                        key="katalog" 
                        title="Fragenkatalog" 
                        component={Fragekatalog} 
                        backButtonImage={img.backButton}
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
                    </Scene>

                </Scene>
                

                <Scene key="exam" title="Exam" icon={TabIcon}>
                        <Scene 
                        key="test" 
                        title="Prüfungsmodus"
                        component={StartPage}
                        onLeft={toMain}
                        leftButtonImage={img.leftButton}
                        leftButtonIconStyle={styles.leftImageButton}
                        leftButtonStyle={styles.navImageButtonStyle}
                        initial 
                        hideNavBar
                        />
                    
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
                        hideNavBar              
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
