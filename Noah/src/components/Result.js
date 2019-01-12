import React, { Component } from 'react';
import { View, ScrollView, Text, Platform, ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import FlashMessage, { showMessage } from 'react-native-flash-message';
import { Card, ButtonWithImage } from './common';
import * as actions from '../actions';
import { iosFix } from '../utils';
import PureChart from 'react-native-pure-chart';
import { menuStyle, userMessage } from './styleSheets';
import * as img from '../assets/img';

/**
 * Ergebnisseite
 * @author Timur Burkholz
 */
class Result extends Component {
    checkScore() {
         this.Ergebnis = 'Leider nicht bestanden';
        if (this.props.quiz.basisScore >= 5 && this.props.quiz.spezScore >= 18) {
            this.Ergebnis = 'Glückwünsch, bestanden';
            if (this.props.quiz.passedFb.includes(this.props.quiz.fragebogen) === false 
                && this.props.quiz.fragebogen !== 'random') {
                    this.props.passFb(this.props.quiz.fragebogen);
            }
        }
    }
    /**
     * Hierbei können falsche Fragen wiederholt werde
     * Bei Buttonklick
     * Weiterleitung zu RepeatPage.js Pages
     */
    wrongRepeate() {
        if (this.props.quiz.wrongAns.length > 0) {
        this.props.resetWrongAnswer();
        actions.toRepeatWrong();
        } else {
            showMessage({
                message: 'Hinweis',
                description: 'Keine falschen Fragen mehr vorhanden',
                type: 'info',
                icon: 'info'
            });
        }
    }
    /**
     * Hierbei können markierte Fragen wiederholt werde
     * Bei Buttonklick
     * Weiterleitung zu MarkedQuestion.js Pages
     */
    marked() {
        this.props.resetMarked();
        if (this.props.quiz.marked.length > 0) {
            actions.toRepeatMarked();
            } else {
                showMessage({
                    message: 'Hinweis',
                    description: 'Kein Frage markiert',
                    type: 'info',
                    icon: 'info'
                });
            }
    }
    /**
     * Hierbei können alle Fragen wiederholt werde
     * Bei Buttonklick
     * Weiterleitung zu RepeatAll.js Pages
     */
    all() {
        this.props.resetMarked();
        actions.toRepeatAll();
    }

    renderContent() {
        const { 
            cardStyle,
            cardTitle,             
            smallButtonStyle,
            bigButtonStyle,
            imageStyle,
           // noImageStyle
        } = menuStyle;
       
        // Inhalt für Stastik, passedFB= Redux-State mit bestanden FB
        const passed = this.props.quiz.passedFb.length;
        const rest = 15 - passed; 
        
       const sampleData = [
        {
          seriesName: 'Anzahl Fragebögen',
          data: [
            { x: 'bestanden', y: passed },
            { x: 'zu bestehen', y: rest },
          ],
          color: '#297AB1'
        },
    ]
        this.checkScore();
        return (
            <View style={{ flex: 1 }}>
                <ScrollView>
                    <Card cardStyle={cardStyle}>
                        <Text style={cardTitle}>{this.Ergebnis}</Text>
                        <Text>Basisfragen: {this.props.quiz.basisScore} von 7 </Text>
                        <Text>Spezifische Fragen: {this.props.quiz.spezScore} von 23 </Text>           
                    </Card>

                    <Card cardStyle={cardStyle}>
                        <Text style={cardTitle}>Übersicht deiner bestandenen Fragebögen</Text>
                        <View style={{ alignItems: 'center' }}>
                            <PureChart data={sampleData} type='bar' />
                        </View>
                    </Card>

                    <Card cardStyle={cardStyle}>
                        <Text style={cardTitle}>Auswertung</Text>
                        <ButtonWithImage
                            buttonText="Falsche Fragen" 
                            onPress={() => this.wrongRepeate()}
                            buttonStyle={bigButtonStyle} 
                            imageStyle={imageStyle}
                            imgLeft={require('../assets/img/wrong.png')}
                            disabled={this.props.quiz.wrongAns.length === 0}
                        />
                        <ButtonWithImage
                            buttonText="Markierte Fragen" 
                            onPress={() => this.marked()} 
                            buttonStyle={smallButtonStyle} 
                            imageStyle={imageStyle}
                            imgLeft={img.mark}
                            disabled={this.props.quiz.marked.length === 0}
                        />
                        <ButtonWithImage
                        buttonText="Alle Fragen" 
                        onPress={() => this.all()} 
                        buttonStyle={smallButtonStyle} 
                        imageStyle={imageStyle}
                        imgLeft={require('../assets/img/repeat.png')}
                        />

                    </Card>
               
                
                <View>
                    <Card cardStyle={cardStyle}>
                        <Text style={cardTitle}>Navigation </Text>
                        <ButtonWithImage
                            buttonText="Fragebögen" 
                            onPress={actions.toTests}
                            buttonStyle={bigButtonStyle} 
                            imageStyle={imageStyle}
                            imgLeft={require('../assets/img/test.png')}
                        />
                        <ButtonWithImage
                            buttonText="Hauptmenü" 
                            onPress={actions.toMain} 
                            buttonStyle={smallButtonStyle} 
                            imageStyle={imageStyle}
                            imgLeft={require('../assets/img/home.png')}
                        />
                    </Card>                 
                </View>

                </ScrollView>
                <FlashMessage 
                    style={userMessage.flashMessage} 
                    ref="myLocalFlashMessage" 
                    position="top"
                /> 
            </View>
        );
    }

    render() {
        if (Platform.OS === 'ios') {
            return (
                <ImageBackground
                    source={iosFix.path}
                    style={iosFix.style}
                >
                    {this.renderContent()}
                </ImageBackground>
            );
        }
        return (
            this.renderContent()
        );
    }
}

const mapStateToProbs = state => {
    return { quiz: state.selectedFb };
};

export default connect(mapStateToProbs, actions)(Result);
