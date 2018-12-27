import React, { Component } from 'react';
import { ScrollView, Text } from 'react-native';
import { Card, CardSection, Button } from './common';
import * as actions from '../actions';

class LearnMenu extends Component {

    
    render() {
        const { 
            cardStyle,
            cardTitle, 
            bigButtonStyle,
            smallButtonStyle
        } = styles;

        return (
            <ScrollView>
                <Card cardStyle={cardStyle}>
                    <Text style={cardTitle}>Fragen lernen </Text>
                    <Button 
                        children="Basis" 
                        onPress={actions.toLearnBasicQuestions}
                        buttonStyle={smallButtonStyle} 
                    />
                    <Button 
                        children="Binnen" 
                        onPress={actions.toLearnBinnenQuestions} 
                        buttonStyle={smallButtonStyle} 
                    />
                    <Button 
                        children="Segel" 
                        onPress={actions.toLearnSegelQuestions} 
                        buttonStyle={smallButtonStyle} 
                    />
                </Card>
                
                <Button 
                    children="Glossar" 
                    onPress={actions.toGlossar} 
                    buttonStyle={bigButtonStyle} 
                />
                <Button 
                    children="Videos" 
                    onPress={actions.toVideos} 
                    buttonStyle={bigButtonStyle} 
                />
            </ScrollView>
        );
    }
}

const styles = {
    cardStyle: {
        paddingLeft: 5,
        paddingTop: 5,
        paddingBottom: 5,
    },
    cardTitle: {
        fontSize: 20,

    },
    bigButtonStyle: {
        padding: 15
    },
    smallButtonStyle: {
        padding: 5,
        marginLeft: 20,
        marginRight: 0
    }
};

export default LearnMenu;
