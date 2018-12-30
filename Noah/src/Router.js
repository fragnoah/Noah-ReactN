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
import startPage from './components/startPage';
import learnbasic from './components/LearnBasic';
import learnbinnen from './components/LearnBinnen';
import learnsegel from './components/LearnSegel';
import { toMain, toResult } from './actions';
import RepeatPage from './components/RepeatPage';

import markedQuestion from './components/markedQuestion';
import RepeatAll from './components/RepeatAll';

import GlossarList from './components/GlossarList';
import VideoList from './components/VideoList';


class RouterComponent extends Component {

    renderIOS() {
        return (
            <ImageBackground
                source={imagePaths.wallPaper}
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
           /* sollte funktionieren ... tut es aber nicht ....
            <View style={{ flex: 1, backgroundColor: '#8BD5FB' }}>
                <Router
                  navigationBarStyle={styles.viewStyle}
                  //getSceneStyle={() => ({ backgroundColor: 'transparent' })}
                  //sceneStyle={styles.sceneStyle}
                >
                  {this.renderScenes()}
                </Router>
                <Image
                    source={require('./assets/img/NOAH_Wallpaper.png')}
                    style={{
                        zIndex: 0,
                        resizeMode: 'cover',
                        height: '100%',
                        width: '100%'
                    }}
                />
            </View>
            */
        );
    }

    renderAndroid() {
        return (
            <ImageBackground
                source={imagePaths.wallPaper}
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

    renderScenes() {
        return (
            <Scene key="root" hideNavBar titleStyle={styles.titleStyle}>
                <Scene key="main" initial>
                    <Scene 
                        key="menu" 
                        title="Menü"    
                        component={MainMenu} 
                        renderBackButton={() => (null)}
                        initial 
                    />
                </Scene>
                
                <Scene key="exam">
                    <Scene 
                        key="test" 
                        title="Prüfungsmodus"
                        component={startPage}
                        onLeft={toMain}
                        leftButtonImage={imagePaths.leftButton}
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
                        initial
                    />
                </Scene>
                <Scene key="marked">
                    <Scene 
                        key="mark" 
                        title="Makierte Fragen" 
                        component={markedQuestion} 
                        renderBackButton={() => (null)}
                        onLeft={toResult}
                        leftButtonImage={imagePaths.leftButton}
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
                        leftButtonImage={imagePaths.leftButton}
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
                        leftButtonImage={imagePaths.leftButton}
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
                        leftButtonImage={imagePaths.leftButton}
                        leftButtonIconStyle={styles.leftImageButton}
                        leftButtonStyle={styles.navImageButtonStyle}
                        initial 
                    />
                    <Scene 
                        key="learnbasic" 
                        title="Basisfragen" 
                        component={learnbasic} 
                        backButtonImage={imagePaths.backButton}
                    />
                    <Scene 
                        key="learnbinnen" 
                        title="Binnenfragen" 
                        component={learnbinnen} 
                        backButtonImage={imagePaths.backButton}
                    />
                    <Scene 
                        key="learnsegel" 
                        title="Segelfragen" 
                        component={learnsegel} 
                        backButtonImage={imagePaths.backButton}
                    />
                    <Scene 
                        key="glossar" 
                        title="Glossar" 
                        component={GlossarList} 
                        backButtonImage={imagePaths.backButton}
                    />
                    <Scene 
                        key="videos" 
                        title="Videos" 
                        component={VideoList} 
                        backButtonImage={imagePaths.backButton}
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

const imagePaths = {
    wallPaper: require('./assets/img/NOAH_Wallpaper.png'),
    backButton: require('./assets/img/arrowLeft3.png'),
    leftButton: require('./assets/img/arrowLeft3.png'),
}; 

const styles = {
    viewNavBarStyle: {
        backgroundColor: 'rgba(21,98,231,0.75)',
        paddingTop: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        elevation: 2,
        //marginBottom: 10
    },
    titleStyle: {
        alignSelf: 'center',
        fontSize: 25,
        color: '#FFFFFF',
    },
    sceneStyle: {
        backgroundColor: 'transparent',
        //opacity: 1
    },
    sceneStyleIOS: {
      flex: 1,
      backgroundColor: 'rgba(145,200,250,1)'
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
    },
    leftImageButton: { 
        //flex: 1,
        resizeMode: 'contain',
        height: 18,
        width: 10,
        paddingLeft: 15
    },
    navImageButtonStyle: {
        height: 40,
        width: 120
    }
};

export default RouterComponent;
