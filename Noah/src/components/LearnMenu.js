import React, { Component } from 'react';
import { ScrollView, Text, Platform, ImageBackground } from 'react-native';
import { Card, ButtonWithImage } from './common';
import * as actions from '../actions';
import { iosFix } from '../utils';
import { menuStyle } from './styleSheets';

class LearnMenu extends Component {

    
    renderContent() {
        const { 
            cardStyle,
            cardTitle, 
            bigButtonStyle,
            smallButtonStyle,
            imageStyle
        } = menuStyle;

        return (
            <ScrollView>
                <Card cardStyle={cardStyle}>
                    <Text style={cardTitle}>Fragen lernen </Text>
                    <ButtonWithImage 
                        buttonText="Basis" 
                        onPress={actions.toLearnBasicQuestions}
                        buttonStyle={bigButtonStyle} 
                        imageStyle={imageStyle}
                        imgLeft={require('../assets/img/question.png')}
                    />
                    <ButtonWithImage 
                        buttonText="Binnen" 
                        onPress={actions.toLearnBinnenQuestions} 
                        buttonStyle={smallButtonStyle} 
                        imageStyle={imageStyle}
                        imgLeft={require('../assets/img/question.png')}
                    />
                    <ButtonWithImage 
                        buttonText="Segel" 
                        onPress={actions.toLearnSegelQuestions} 
                        buttonStyle={smallButtonStyle} 
                        imageStyle={imageStyle}
                        imgLeft={require('../assets/img/question.png')}
                    />
                </Card>
                <Card cardStyle={cardStyle}>
                    <Text style={cardTitle}>Nachschlagen</Text>
                    <ButtonWithImage 
                        buttonText="Glossar" 
                        onPress={actions.toGlossar} 
                        buttonStyle={bigButtonStyle} 
                        imageStyle={imageStyle}
                        imgLeft={require('../assets/img/folder.png')}
                    />
                </Card>
                <Card cardStyle={cardStyle}>
                    <Text style={cardTitle}>Praxis </Text>
                    <ButtonWithImage 
                        buttonText="Videos" 
                        onPress={actions.toVideos} 
                        buttonStyle={bigButtonStyle} 
                        imageStyle={imageStyle}
                        imgLeft={require('../assets/img/film.png')}
                    />
            </Card>
            </ScrollView>
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

export default LearnMenu;
