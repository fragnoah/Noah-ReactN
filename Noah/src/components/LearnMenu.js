import React, { Component } from 'react';
import { ScrollView, Text } from 'react-native';
import { Card, ButtonWithImage } from './common';
import * as actions from '../actions';

class LearnMenu extends Component {

    
    render() {
        const { 
            cardStyle,
            cardTitle, 
            bigButtonStyle,
            smallButtonStyle,
            imageStyle
        } = styles;

        return (
            <ScrollView>
                <Card cardStyle={cardStyle}>
                    <Text style={cardTitle}>Fragen lernen </Text>
                    <ButtonWithImage 
                        buttonText="Basis" 
                        onPress={actions.toLearnBasicQuestions}
                        buttonStyle={smallButtonStyle} 
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
                        buttonStyle={smallButtonStyle} 
                        imageStyle={imageStyle}
                        imgLeft={require('../assets/img/folder.png')}
                    />
                </Card>
                <Card cardStyle={cardStyle}>
                    <Text style={cardTitle}>Praxis </Text>
                    <ButtonWithImage 
                        buttonText="Videos" 
                        onPress={actions.toVideos} 
                        buttonStyle={smallButtonStyle} 
                        imageStyle={imageStyle}
                        imgLeft={require('../assets/img/film.png')}
                    />
            </Card>
            </ScrollView>
        );
    }
}

const styles = {
    cardStyle: {
        paddingLeft: 5,
        paddingTop: 5,
        paddingBottom: 5,
        backgroundColor: 'rgba(255,255,255, 0.3)',
    },
    cardTitle: {
        fontSize: 20,
        opacity: 1
    },
    bigButtonStyle: {
        padding: 15,
        opacity: 1
    },
    smallButtonStyle: {
        padding: 0,
        marginLeft: 20,
        marginRight: 2,
        opacity: 1
    },
    imageStyle: {
        height: 50,
        width: 50
    }
};

export default LearnMenu;
