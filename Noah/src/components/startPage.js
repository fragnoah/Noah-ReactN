import React, { Component } from 'react';
import { ScrollView, Text, Alert, Platform, ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Card, ButtonWithImage } from './common';
import { iosFix } from '../utils';
import { menuStyle } from './styleSheets';

class startPage extends Component {
    componentWillMount() {
        if (this.props.quiz.qno !== 29 && this.props.quiz.fragebogen !== '') {
            this.props.resetDefault();
            Alert.alert(
                'Mitteilung',
                'Letzen Versuch fortsetzen?',
                [
                { text: 'Abbrechen', onPress: () => this.props.resetFb(), style: 'cancel' },
                { text: 'OK', onPress: () => actions.toQuestions() },
                ],
                { cancelable: false }
            );
            }
        if (this.props.quiz.qno === 29) {
            this.props.resetFb();
        } 
    }   
    getFb(fb) {
        this.props.resetFb();
        this.props.selectFb(fb);
        actions.toQuestions();
    }

    renderContent() {
        const { 
            cardStyle,
            cardTitle,             
            smallButtonStyle,
            bigButtonStyle,
            imageStyle,
            noImageStyle
        } = menuStyle;

        return (
            <ScrollView>
                <Card cardStyle={cardStyle}>
                    <Text style={cardTitle}>vorgefertigter Test </Text>
                    <ButtonWithImage 
                        buttonText="Fragebogen 1" 
                        onPress={() => this.getFb('fb1')}
                        buttonStyle={bigButtonStyle} 
                        imageStyle={noImageStyle}
                    />
                    <ButtonWithImage 
                        buttonText="Fragebogen 2" 
                        onPress={() => this.getFb('fb2')} 
                        buttonStyle={smallButtonStyle} 
                        imageStyle={noImageStyle}
                    />

                </Card>
                <Card cardStyle={cardStyle}>
                    <Text style={cardTitle}>Test generieren</Text>
                    <ButtonWithImage 
                        buttonText="Zufallsfragen" 
                        onPress={() => this.getFb('random')}
                        buttonStyle={bigButtonStyle} 
                        imageStyle={noImageStyle}
                    />
                </Card>  

                <Card cardStyle={cardStyle}>
                    <Text style={cardTitle}>Statistik</Text>
                    <ButtonWithImage 
                        buttonText="Statistik Test" 
                        onPress={actions.toResult} 
                        buttonStyle={bigButtonStyle} 
                        imageStyle={imageStyle}
                        imgLeft={require('../assets/img/statistics.png')}
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

const mapStateToProbs = state => {
    return { quiz: state.selectedFb };
};

export default connect(mapStateToProbs, actions)(startPage);

